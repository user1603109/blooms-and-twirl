/**
 * ==============================================================================
 * BLOOM & TWIRL BY SHAIRA - GOOGLE SHEETS & 5TB GDRIVE DATABASE WEBHOOK
 * ==============================================================================
 * 
 * Instructions:
 * 1. Open your Google Drive (5TB account)
 * 2. Create a new Google Spreadsheet named "Bloom&Twirl_Database"
 * 3. In the Spreadsheet, go to: Extensions > Apps Script
 * 4. Paste this entire code into `Code.gs`
 * 5. Click "Deploy" > "New deployment"
 * 6. Select type: "Web app"
 * 7. Execute as: "Me"
 * 8. Who has access: "Anyone" (crucial for web frontend communication)
 * 9. Click Deploy, copy the "Web App URL", and paste it into Bloom&Twirl Settings!
 */

function setupDatabase() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  var sheets = {
    "Orders": ["Order ID", "Date", "Customer Name", "Phone", "Email", "Address", "Arrangement", "Total", "Due Time", "Channel", "Status", "Courier", "Card Message"],
    "Products": ["ID", "Name", "Tag", "Category", "Price", "Cold Room Stock", "Sold 30d", "Rating", "Image URL", "Stems", "Description"],
    "Inventory": ["ID", "Name", "Type", "In Stock", "Needed", "Unit", "Is Low"],
    "Customers": ["Customer ID", "Name", "Initials", "Email", "Phone", "Segment", "Orders Count", "Lifetime Value", "Last Order", "Since"],
    "Deliveries": ["Run ID", "Time", "Recipient", "Location", "Courier", "Status", "Order ID"],
    "Promotions": ["Promo ID", "Code", "Description", "Discount", "Status", "Uses"],
    "Reviews": ["Review ID", "Customer Name", "Quote", "Rating", "Badge", "Date"],
    "Settings": ["Key", "Value"]
  };
  
  for (var name in sheets) {
    var sheet = ss.getSheetByName(name);
    if (!sheet) {
      sheet = ss.insertSheet(name);
    }
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(sheets[name]);
      sheet.getRange(1, 1, 1, sheets[name].length).setFontWeight("bold").setBackground("#FFF0F5");
    }
  }
}

function doGet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var result = {};
  
  var sheetNames = ["Orders", "Products", "Inventory", "Customers", "Deliveries", "Promotions", "Reviews"];
  
  sheetNames.forEach(function(sheetName) {
    var sheet = ss.getSheetByName(sheetName);
    if (sheet && sheet.getLastRow() > 1) {
      var data = sheet.getDataRange().getValues();
      var headers = data[0];
      var rows = [];
      for (var i = 1; i < data.length; i++) {
        var rowObj = {};
        for (var j = 0; j < headers.length; j++) {
          rowObj[headers[j]] = data[i][j];
        }
        rows.push(rowObj);
      }
      result[sheetName] = rows;
    } else {
      result[sheetName] = [];
    }
  });

  return ContentService.createTextOutput(JSON.stringify({
    status: "success",
    timestamp: new Date().toISOString(),
    data: result
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var contents = JSON.parse(e.postData.contents);
    var action = contents.action;
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    if (action === "create_order") {
      var o = contents.order;
      var sheet = ss.getSheetByName("Orders");
      if (!sheet) { setupDatabase(); sheet = ss.getSheetByName("Orders"); }
      sheet.appendRow([
        o.id,
        o.date || new Date().toISOString(),
        o.customerName,
        o.phone || "",
        o.email || "",
        o.address || "",
        o.arrangementName,
        o.total,
        o.dueTime || "Today",
        o.channel || "Online",
        o.status || "Fresh",
        o.courier || "",
        o.cardMessage || ""
      ]);
      return ContentService.createTextOutput(JSON.stringify({ status: "success", orderId: o.id })).setMimeType(ContentService.MimeType.JSON);
    }
    
    if (action === "upload_drive_image") {
      // 5TB Google Drive Asset Handler
      var folderId = contents.folderId;
      var base64Data = contents.base64Data;
      var fileName = contents.fileName || "flower_" + Date.now() + ".jpg";
      
      var folder = folderId ? DriveApp.getFolderById(folderId) : DriveApp.getRootFolder();
      var decoded = Utilities.base64Decode(base64Data.split(",")[1] || base64Data);
      var blob = Utilities.newBlob(decoded, "image/jpeg", fileName);
      var file = folder.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      
      var fileId = file.getId();
      var directUrl = "https://lh3.googleusercontent.com/d/" + fileId;
      
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        fileId: fileId,
        directUrl: directUrl
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ status: "ok", action: action })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}
