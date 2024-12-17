const Papa = require('papaparse');

// Read data from CSV file
Papa.parse('data.csv', {
  header: true,
  dynamicTyping: true,
  complete: function(results) {
    // Newman code starts here
    pm.test("Status code is 200", function () {
      pm.response.to.have.status(200);
    });

    // Loop through each row in the CSV data
    results.data.forEach((data) => {
      pm.sendRequest({
        url: 'https://api-kebijakanprivasi-qa.bsi.co.id/ConsentService/v1/Generate',
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5M2Y3ZmU5Yy1iYTZlLTQ1YTgtYTljMS0yOTE5YmEyOWIxN2YiLCJuYW1lIjoibW1rc2luYXNydWwiLCJSb2xlIjpbIkFQSVVzZXIiLCJNTUtTSSJdLCJleHAiOjE3MzQ0NDE1NTYsImlzcyI6ImFwaWlzc3VlciIsImF1ZCI6ImFwaWF1ZGllbmNlIn0.3OJmfQ14_9W9Fk2UDodUFHaDEgMuAmZVxfWY8rCSefs'
        },
        body: {
          mode: 'raw',
          raw: JSON.stringify({
            consent: {
              ApplicationCode: data.ApplicationCode,
              Name: data.Name, 
              IdentityNo: data.IdentityNo, 
              Email: data.Email,
              Phone: data.Phone,
              EntityType: data.EntityType,
              CreatedBy: data.CreatedBy,
              CreatedTime: data.CreatedTime,
              DeliveryMethod: data.DeliveryMethod
            }
          })
        }
      }, function (err, res) {
        if (err) {
          console.error(err);
        } else {
          console.log(res);
        }
      });
    });
  }
});