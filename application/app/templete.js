module.exports = {
  HTML: function (func, type, data) {
    // func : chaincode name
    // type : true : submit tx, false : evaluate tx
    // data : data from get/post

    if (func == "GetAllDatas" || func == "GetSeller" || func == "GetBuyer") {
      const datas = JSON.parse(data);
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Data Transfer DApp</title>                
            <link rel="stylesheet" href="style.css" />
          </head>  
                          
          <body>            
            <div id="title">
              <a href="/">
                <h1>Data Transfer DApp</h1>
              </a>
              <div id="pjp">pjp_trio</div>
            </div>

            <h1>${func}</h1>
            <div id=${func}>
                            
              <table>
                ${Object.keys(datas[0].Record).map((key) => {
                  return `<th>${key}</th>`;
                })}
                
                ${datas.map((data) => {
                  return `
                  <tr>                      
                    ${Object.values(data.Record).map((value) => {
                      return `<td>${value.replace(/,/gi, " /")}</td>`;
                    })}   
                  </tr>                   
                  `;
                })}
              </table>
            </div>
          </body>
        </html>
        `.replace(/,/gi, "");
    } else if (func == "ReadData") {
      const datas = JSON.parse(data);
      return `
        <!DOCTYPE html>
        <html>
          <head>
              <meta charset="UTF-8">
              <title>Data Transfer DApp</title>                
              <link rel="stylesheet" href="style.css" />
          </head>
          
          <body>
            <div id="title">
              <a href="/">
                <h1>Data Transfer DApp</h1>
              </a>
              <div id="pjp">pjp_trio</div>
            </div>

            <h1>${func}</h1>
            <div id=${func}>
                            
              <table>
                ${Object.keys(datas).map((key) => {
                  return `<th>${key}</th>`;
                })}

                <tr>                    
                ${Object.values(datas).map((value) => {
                  return `<td>${value}</td>`;
                })}
                </tr>
              </table>
            </div>
          </body>
        </html>
        `.replace(/,/gi, "");
    } else {
      return `
        <!DOCTYPE html>
        <html>
          <head>
              <meta charset="UTF-8">
              <title>Data Transfer DApp</title>                
              <link rel="stylesheet" href="style.css" />
          </head>
          
          <body>
            <div id="title">
              <a href="/">
                <h1>Data Transfer DApp</h1>
              </a>
              <div id="pjp">pjp_trio</div>
            </div>

            <h1>${func}</h1>
            <div id=${func}>
              ${data}
            </div>
          </body>
        </html>`;
    }
  },
};
