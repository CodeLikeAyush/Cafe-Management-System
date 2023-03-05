const connection = require('./connection');
const puppeteer = require('puppeteer')
// const fs = require('fs')

const generateBill = async (ord_id) => {
    // launch a new chrome instance
    const browser = await puppeteer.launch({
        headless: true
    })

    // create a new page
    const page = await browser.newPage()

    // set your html as the pages content
    // const html = fs.readFileSync(`${__dirname}/template.html`, 'utf8')


    let str1 = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <title>Purchase Bill</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
    
            body {
                font-family: Arial, Helvetica, sans-serif;
    
            }
    
            table {
                width: 95%;
                height: 100%;
                margin: auto;
            }
    
    
            th,
            td {
                border: 1px solid white;
                border-collapse: collapse;
            }
    
            th,
            td {
                background-color: #00ff00;
                color: black;
                height: 50px;
                text-align: center;
                font-size: 20px;
            }
    
            h1,
            h2 {
                display: block;
                text-align: center;
                color: green;
            }
        </style>
    </head>
    
    <body>
        <h1 style="background-color: green;color:white;height: 80px;padding: 15px;">Ayush Cafe</h1><br><br>
        <h2>Purchase Bill</h2><br><hr><br>
        <table>
            <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
            </tr>

    `
    let str2 = '';
    let str3 = '';



    let query = 'update cust_order set bill_amount = ( select sum(total) from billing_info where ord_id = ?) where ord_id = ?'
    connection.query(query, [ord_id, ord_id], (err, results) => {
        if (!err) {
            // console.log(results)
            query = ' select * from billing_info where ord_id = ?'

            connection.query(query, [ord_id], async (err, results) => {
                if (!err) {
                    // console.log(results)

                    results.forEach(result => {
                        str2 += `
                               <tr>
                                   <td>${result.prod_name}</td>
                                   <td>${result.quantity}</td>
                                   <td>&#8377;${result.unit_price}</td>
                                   <td>&#8377;${result.total}</td>
                               </tr>
                              `
                    });
                    let bill_total = 0;
                    query = 'select sum(total) as bill_total from billing_info where ord_id = ?'
                    connection.query(query, [ord_id], async (err, results, fields) => {
                        if (!err) {
                            bill_total = results[0].bill_total;
                            str3 += `
                            <tr>
                                <td colspan="3"><b>Total:</b></td>
                                <td><b>&#8377;${bill_total}</b></td>
                            </tr>
                        </table>
                        <br><br><br><br><br><br><br>
                        <h2>🙏Thank You🙏</h2>
                    </body>
           
                    </html>`


                            const html = str1 + str2 + str3;
                            await page.setContent(html, {
                                waitUntil: 'domcontentloaded'
                            })

                            // create a pdf buffer
                            const pdfBuffer = await page.pdf({
                                format: 'A4',
                            })

                            // or a .pdf file
                            await page.pdf({
                                format: 'A4',
                                printBackground: true,
                                path: `${__dirname}/public/bills_pdf/bill_${ord_id}.pdf`,
                            })

                            // close the browser
                            await browser.close()
                            query = 'update cust_order set ord_bill = ? where ord_id = ?'
                            // const customer_bill = 
                            connection.query(query, [`bill_${ord_id}`, ord_id], (err, results, fields) => {
                                if (!err) {
                                    console.log(results);

                                }
                                else {
                                    console.log(err)
                                }
                            })
                        }
                        else {
                            console.log(err)
                        }
                    })

                }
                else {
                    console.log(err);
                }
            })

        }
        else {
            console.log(err);
        }
    })


}

module.exports = generateBill;