export const vMail = (user, list, invNumber) => {
    var emailto = `${user}@wfp.org`;
    var emailsubject = "GEMS";
    var me = 'To: ' + emailto + '\n';

    me += 'Subject: ' + emailsubject + '\n';
    me += 'X-Unsent: 1' + '\n';

    me += 'Content-Type: text/html' + '\n';
    me += '' + '\n';

    me += "<!DOCTYPE html><html style='box-sizing: border-box'xmlns:v='urn:schemas-microsoft-com:vml'xmlns:o='urn:schemas-microsoft-com:office:office'lang='en'>"
    me += "<head><title></title><meta http-equiv='Content-Type' content='text/html; charset=utf-8' /><meta name='viewport' content='width=device-width, initial-scale=1.0' /><linkhref='https://fonts.googleapis.com/css?family=Roboto'rel=' stylesheet'type='text/css'/>"
    me += "<link href='https://fonts.googleapis.com/css?family=Lato' rel=' stylesheet' type='text/css' />"
    me += "</head><body  style='background-color: #ffffff;margin: 0;padding: 0;-webkit-text-size-adjust: none;text-size-adjust: none;'>"
    me += "<table  class='nl-container' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation'  style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;background-color: #ffffff;'>"
    me += "<tbody><tr><td><table  class='row row-1' align='center' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation'  style='mso-table-lspace: 0pt; mso-table-rspace: 0pt'>"
    me += "<tbody><tr><td><table  class='row-content stack' align='center' border='0' cellpadding='0' cellspacing='0' role='presentation'  style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;color: #000000;width: 500px;'width='500'>"
    me += "<tbody><tr><td  class='column column-1' width='100%'  style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-weight: 400;text-align: left;vertical-align: top;padding-top: 5px;padding-bottom: 5px;border-top: 0px;border-right: 0px;border-bottom: 0px;border-left: 0px;'><table  class='heading_block' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation'  style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;'>"
    me += "<tr><td  style='width: 100%; text-align: center'><h1  style='margin: 0;color: #393d47;font-size: 23px;font-family: Arial, Helvetica Neue,Helvetica, sans-serif;line-height: 120%;text-align: center;direction: ltr;font-weight: 700;letter-spacing: normal;margin-top: 0;margin-bottom: 0;'>"
    me += "Inventory Assignment </h1> </td> </tr> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table  class='row row-2' align='center' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation'  style='mso-table-lspace: 0pt; mso-table-rspace: 0pt'>"
    me += "<tbody><tr><td><table  class='row-content stack' align='center' border='0' cellpadding='0' cellspacing='0' role='presentation'  style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;color: #000000;width: 500px;'width='500'>"
    me += "<tbody><tr><td  class='column column-1' width='100%'  style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-weight: 400;text-align: left;vertical-align: top;padding-top: 5px;padding-bottom: 5px;border-top: 0px;border-right: 0px;border-bottom: 0px;border-left: 0px;'><table  class='divider_block' width='100%' border='0' cellpadding='10' cellspacing='0' role='presentation'  style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;'>"
    me += "<tr><td><div align='center'><tableborder='0'cellpadding='0'cellspacing='0'role='presentation'width='100%' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;'><tr><td  class='divider_inner' style='font-size: 1px;line-height: 1px;border-top: 1px solid #bbbbbb;'><span>&#8202;</span></td></tr></table></div></td></tr>"
    me += "</table></td></tr></tbody></table></td></tr></tbody></table><table  class='row row-3'align='center'width='100%'border='0'cellpadding='0'cellspacing='0'role='presentation' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;background-color: #ffffff;'><tbody><tr><td>"
    me += "<table class='row-content stack'align='center'border='0'cellpadding='0'cellspacing='0'role='presentation' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;color: #000000;width: 500px;'width='500'><tbody><tr><td class='column column-1'width='100%' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-weight: 400;text-align: left;vertical-align: top;padding-top: 5px;padding-bottom: 5px;border-top: 0px;border-right: 0px;border-bottom: 0px;border-left: 0px;'>"
    me += "<table class='heading_block'width='100%'border='0'cellpadding='0'cellspacing='0'role='presentation' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;'><tr><td  style='width: 100%; text-align: center'><h3 style='margin: 0;color: #393d47;font-size: 15px;font-family: Arial, Helvetica Neue,Helvetica, sans-serif;line-height: 120%;text-align: center;direction: ltr;font-weight: 400;letter-spacing: normal;margin-top: 0;margin-bottom: 0;'><span  class='tinyMce-placeholder'><strong>USER</strong> -"
    me += `${user}@wfp.org` + "</span></h3></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table class='row row-4'align='center'width='100%'border='0'cellpadding='0'cellspacing='0'role='presentation' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;background-color: #f0f0f0;'>"
    me += "<tbody><tr><td><table class='row-content stack'align='center'border='0'cellpadding='0'cellspacing='0'role='presentation' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;color: #000000;width: 500px;'width='500'><tbody>"
    me += "<tr><td class='column column-1'width='100%' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-weight: 400;text-align: left;vertical-align: top;padding-top: 5px;padding-bottom: 5px;border-top: 0px;border-right: 0px;border-bottom: 0px;border-left: 0px;'>"
    me += "<table class='list_block'width='100%'border='0'cellpadding='10'cellspacing='0'role='presentation' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;word-break: break-word;'><tr><td><ul style='margin: 0;padding: 0;list-style-position: inside;color: #393d47;font-size: 14px;font-family: Arial, Helvetica Neue,Helvetica, sans-serif;font-weight: 400;line-height: 120%;text-align: center;direction: ltr;letter-spacing: 0px;'>" + `<li style='margin-bottom: 10px;'>${list + " - " + invNumber}</li>` + "</ul></td></tr></table>"
    me += "</td></tr></tbody></table></td></tr></tbody></table> <table class='row row-5'align='center'width='100%'border='0'cellpadding='0'cellspacing='0'role='presentation'"
    me += " style='mso-table-lspace: 0pt; mso-table-rspace: 0pt'><tbody><tr><td><table class='row-content stack'align='center'border='0'cellpadding='0'cellspacing='0'role='presentation' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;color: #000000;width: 500px;'width='500'><tbody><tr><td class='column column-1'width='100%' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-weight: 400;text-align: left;vertical-align: top;padding-top: 5px;padding-bottom: 5px;border-top: 0px;border-right: 0px;border-bottom: 0px;border-left: 0px;'><table class='divider_block'width='100%'border='0'cellpadding='10'cellspacing='0'role='presentation' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;'><tr><td>"
    me += "<div align = 'center'> <tableborder='0'cellpadding = '0'cellspacing = '0'role = 'presentation'width = '100%' style = 'mso-table-lspace: 0pt;mso-table-rspace: 0pt;'> <tr><td class='divider_inner' style='font-size: 1px;line-height: 1px;border-top: 1px solid #bbbbbb;'><span>&#8202;</span></td></tr></table></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table>"
    me += "<table class='row row-5' align='center' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'><tbody><tr><td>"
    me += "<table class='row-content stack' align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;' width='500'><tbody><tr>"
    me += "<td class='column column-1' width='33.333333333333336%' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;'>"
    me += "<table class='image_block' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'><tr>"
    me += "<td style='width:100%;padding-top:20px;padding-right:0px;padding-left:0px;padding-bottom:5px;'>"
    me += "<div align='center' style='line-height:10px'><img src='https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/804399_788268/editor_images/pf.png' style='display: block; height: auto; border: 0; width: 42px; max-width: 100%;' width='42'></div></td></tr></table></td>"
    me += "<td class='column column-2' width='66.66666666666667%' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;'>"
    me += "<table class='paragraph_block' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;'>"
    me += "<tr><td style='padding-top:30px;padding-right:10px;padding-bottom:15px;padding-left:10px;'>"
    me += "<div style='color:#117a26;font-size:14px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-weight:700;line-height:120%;text-align:left;direction:ltr;letter-spacing:0px;'>"
    me += "<p style='margin: 0;'>Verified By Biometrics</p></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table>"
    me += "<table class='row row-7'align = 'center'width = '100%'border = '0'cellpadding = '0'cellspacing = '0'role = 'presentation' style = 'mso-table-lspace: 0pt;mso-table-rspace: 0pt;background-color: #ebe2da;' > <tbody><tr><td><table class='row-content stack' align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;color: #000000;width: 500px;' width='500'><tbody><tr><td class='column column-1' width='33.333333333333336%' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-weight: 400;text-align: left;vertical-align: top;border-top: 0px;border-right: 0px;border-bottom: 0px;border-left: 0px;'><table class='image_block' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;'><tr><td style='width: 100%;padding-right: 0px;padding-left: 0px;padding-top: 5px;padding-bottom: 5px;'><div align='center' style='line-height: 10px'><img src='https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/804399_788268/editor_images/45dcecf2-369c-449f-aa7b-8d2303502c0d.png' style='display: block;height: auto;border: 0;width: 167px;max-width: 100%;' width='167' /></div></td></tr></table></td><td class='column column-2' width='66.66666666666667%' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-weight: 400;text-align: left;vertical-align: top;border-top: 0px;border-right: 0px;border-bottom: 0px;border-left: 0px;'><table class='paragraph_block' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;word-break: break-word;'><tr><td style='padding-top: 45px;padding-right: 10px;padding-bottom: 15px;padding-left: 10px;'><div style='color: #000000;font-size: 14px;font-family: Arial, Helvetica Neue,Helvetica, sans-serif;font-weight: 700;line-height: 120%;text-align: left;direction: ltr;letter-spacing: 0px;'>"
    me += "<p  style = 'margin: 0'> Powered by: WFP IT Sri Lanka</p></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></body></html>"

    var textFile = null;
    var data = new Blob([me], { type: 'text/plain' });
    if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);
    console.log(textFile);
    var a = document.createElement('a'); //make a link in document
    var linkText = document.createTextNode('fileLink');
    a.appendChild(linkText);

    a.href = textFile;

    a.id = 'fileLink';
    a.download = emailsubject + ".eml"; //'filenameTest.eml' ;
    a.style.visibility = "hidden";

    document.body.appendChild(a);

    document.getElementById('fileLink').click();
    document.getElementById("fileLink").remove();
}
export const sMail = (user, list) => {
    var emailto = `${user.name}@wfp.org`;
    var emailsubject = "GEMS";
    var me = 'To: ' + emailto + '\n';
    me += 'Bcc: ' + 'nirthanasundaram.muhunthan@wfp.org' + '\n';
    me += 'Subject: ' + emailsubject + '\n';
    me += 'X-Unsent: 1' + '\n';

    me += 'Content-Type: text/html' + '\n';
    me += '' + '\n';

    me += "<!DOCTYPE html><html style='box-sizing: border-box'xmlns:v='urn:schemas-microsoft-com:vml'xmlns:o='urn:schemas-microsoft-com:office:office'lang='en'>"
    me += "<head><title></title><meta http-equiv='Content-Type' content='text/html; charset=utf-8' /><meta name='viewport' content='width=device-width, initial-scale=1.0' /><linkhref='https://fonts.googleapis.com/css?family=Roboto'rel=' stylesheet'type='text/css'/>"
    me += "<link href='https://fonts.googleapis.com/css?family=Lato' rel=' stylesheet' type='text/css' />"
    me += "</head><body  style='background-color: #ffffff;margin: 0;padding: 0;-webkit-text-size-adjust: none;text-size-adjust: none;'>"
    me += "<table  class='nl-container' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation'  style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;background-color: #ffffff;'>"
    me += "<tbody><tr><td><table  class='row row-1' align='center' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation'  style='mso-table-lspace: 0pt; mso-table-rspace: 0pt'>"
    me += "<tbody><tr><td><table  class='row-content stack' align='center' border='0' cellpadding='0' cellspacing='0' role='presentation'  style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;color: #000000;width: 500px;'width='500'>"
    me += "<tbody><tr><td  class='column column-1' width='100%'  style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-weight: 400;text-align: left;vertical-align: top;padding-top: 5px;padding-bottom: 5px;border-top: 0px;border-right: 0px;border-bottom: 0px;border-left: 0px;'><table  class='heading_block' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation'  style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;'>"
    me += "<tr><td  style='width: 100%; text-align: center'><h1  style='margin: 0;color: #393d47;font-size: 23px;font-family: Arial, Helvetica Neue,Helvetica, sans-serif;line-height: 120%;text-align: center;direction: ltr;font-weight: 700;letter-spacing: normal;margin-top: 0;margin-bottom: 0;'>"
    me += "Inventory Assignment </h1> </td> </tr> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table  class='row row-2' align='center' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation'  style='mso-table-lspace: 0pt; mso-table-rspace: 0pt'>"
    me += "<tbody><tr><td><table  class='row-content stack' align='center' border='0' cellpadding='0' cellspacing='0' role='presentation'  style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;color: #000000;width: 500px;'width='500'>"
    me += "<tbody><tr><td  class='column column-1' width='100%'  style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-weight: 400;text-align: left;vertical-align: top;padding-top: 5px;padding-bottom: 5px;border-top: 0px;border-right: 0px;border-bottom: 0px;border-left: 0px;'><table  class='divider_block' width='100%' border='0' cellpadding='10' cellspacing='0' role='presentation'  style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;'>"
    me += "<tr><td><div align='center'><tableborder='0'cellpadding='0'cellspacing='0'role='presentation'width='100%' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;'><tr><td  class='divider_inner' style='font-size: 1px;line-height: 1px;border-top: 1px solid #bbbbbb;'><span>&#8202;</span></td></tr></table></div></td></tr>"
    me += "</table></td></tr></tbody></table></td></tr></tbody></table><table  class='row row-3'align='center'width='100%'border='0'cellpadding='0'cellspacing='0'role='presentation' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;background-color: #ffffff;'><tbody><tr><td>"
    me += "<table class='row-content stack'align='center'border='0'cellpadding='0'cellspacing='0'role='presentation' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;color: #000000;width: 500px;'width='500'><tbody><tr><td class='column column-1'width='100%' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-weight: 400;text-align: left;vertical-align: top;padding-top: 5px;padding-bottom: 5px;border-top: 0px;border-right: 0px;border-bottom: 0px;border-left: 0px;'>"
    me += "<table class='heading_block'width='100%'border='0'cellpadding='0'cellspacing='0'role='presentation' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;'><tr><td  style='width: 100%; text-align: center'><h3 style='margin: 0;color: #393d47;font-size: 15px;font-family: Arial, Helvetica Neue,Helvetica, sans-serif;line-height: 120%;text-align: center;direction: ltr;font-weight: 400;letter-spacing: normal;margin-top: 0;margin-bottom: 0;'><span  class='tinyMce-placeholder'><strong>USER</strong> -"
    me += user.name + "</span></h3></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table class='row row-4'align='center'width='100%'border='0'cellpadding='0'cellspacing='0'role='presentation' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;background-color: #f0f0f0;'>"
    me += "<tbody><tr><td><table class='row-content stack'align='center'border='0'cellpadding='0'cellspacing='0'role='presentation' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;color: #000000;width: 500px;'width='500'><tbody>"
    me += "<tr><td class='column column-1'width='100%' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-weight: 400;text-align: left;vertical-align: top;padding-top: 5px;padding-bottom: 5px;border-top: 0px;border-right: 0px;border-bottom: 0px;border-left: 0px;'>"
    me += "<table class='list_block'width='100%'border='0'cellpadding='10'cellspacing='0'role='presentation' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;word-break: break-word;'><tr><td><ul style='margin: 0;padding: 0;list-style-position: inside;color: #393d47;font-size: 14px;font-family: Arial, Helvetica Neue,Helvetica, sans-serif;font-weight: 400;line-height: 120%;text-align: center;direction: ltr;letter-spacing: 0px;'>" + list.map((x, i) => `<li style='margin-bottom: 10px;'>${x.title + " - " + x.invNumber}</li>`) + "</ul></td></tr></table>"
    me += "</td></tr></tbody></table></td></tr></tbody></table> <table class='row row-5'align='center'width='100%'border='0'cellpadding='0'cellspacing='0'role='presentation'"
    me += " style='mso-table-lspace: 0pt; mso-table-rspace: 0pt'><tbody><tr><td><table class='row-content stack'align='center'border='0'cellpadding='0'cellspacing='0'role='presentation' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;color: #000000;width: 500px;'width='500'><tbody><tr><td class='column column-1'width='100%' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-weight: 400;text-align: left;vertical-align: top;padding-top: 5px;padding-bottom: 5px;border-top: 0px;border-right: 0px;border-bottom: 0px;border-left: 0px;'><table class='divider_block'width='100%'border='0'cellpadding='10'cellspacing='0'role='presentation' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;'><tr><td>"
    me += "<div align = 'center'> <tableborder='0'cellpadding = '0'cellspacing = '0'role = 'presentation'width = '100%' style = 'mso-table-lspace: 0pt;mso-table-rspace: 0pt;'> <tr><td class='divider_inner' style='font-size: 1px;line-height: 1px;border-top: 1px solid #bbbbbb;'><span>&#8202;</span></td></tr></table></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table>"
    me += "<table class='row row-6' align='center' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'><tbody><tr><td>"
    me += "<table class='row-content stack' align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;' width='500'><tbody><tr>"
    me += "<td class='column column-1' width='100%' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;'>"
    me += "<table class='button_block' width='100%' border='0' cellpadding='10' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'><tr><td>"
    me += "<div align='center'><a href='https://wfp-inventory.web.app/" + `${user._id}/assign` + "' target='_blank' style='text-decoration:none;display:inline-block;color:#ffffff;background-color:#3da34a;border-radius:4px;width:auto;border-top:1px solid #8a3b8f;font-weight:400;border-right:1px solid #8a3b8f;border-bottom:1px solid #8a3b8f;border-left:1px solid #8a3b8f;padding-top:5px;padding-bottom:5px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;'><span style='padding-left:20px;padding-right:20px;font-size:12px;display:inline-block;letter-spacing:normal;'><span style='font-size: 12px; line-height: 2; word-break: break-word; mso-line-height-alt: 24px;'>Click Here</span></span></a></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table>"
    me += "<table class='row row-7' align='center' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #efeded;'>"
    me += "<tbody><tr><td><table class='row-content stack' align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;' width='500'>"
    me += "<tbody>"
    me += "<tr><td class='column column-1' width='33.333333333333336%' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;'>"
    me += "<table class='empty_block' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'><tr>"
    me += "<td style='padding-right:0px;padding-bottom:5px;padding-left:0px;padding-top:5px;'>"
    me += "<div></div></td></tr></table></td>"
    me += "<td class='column column-2' width='66.66666666666667%' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;'>"
    me += "<table class='paragraph_block' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;'><tr>"
    me += "<td style='padding-bottom:15px;padding-left:10px;padding-right:10px;padding-top:30px;'>"
    me += "<div style='color:#b0292b;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:14px;font-weight:700;letter-spacing:0px;line-height:120%;text-align:left;'><p style='margin: 0;'>Verify By E-Signature</p>"
    me += "</div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table>"
    me += "<table class='row row-7' align='center' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ebe2da;'><tbody><tr><td>"
    me += "<table class='row-content stack' align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;' width='500'><tbody><tr>"
    me += "<td class='column column-1' width='33.333333333333336%' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;'>"
    me += "<table class='image_block' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'><tr>"
    me += "<td style='width:100%;padding-right:0px;padding-left:0px;padding-top:5px;padding-bottom:5px;'>"
    me += "<div align='center' style='line-height:10px'><img src='https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/804399_788268/editor_images/45dcecf2-369c-449f-aa7b-8d2303502c0d.png' style='display: block; height: auto; border: 0; width: 167px; max-width: 100%;' width='167'></div></td></tr></table></td>"
    me += "<td class='column column-2' width='66.66666666666667%' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;'>"
    me += "<table class='paragraph_block' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;'><tr>"
    me += "<td style='padding-bottom:15px;padding-left:10px;padding-right:10px;padding-top:45px;'>"
    me += "<div style='color:#000000;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:14px;font-weight:700;letter-spacing:0px;line-height:120%;text-align:left;'>"
    me += "<p style='margin: 0;'>Powered by : WFP IT Sri Lanka</p></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></body></html>"

    var textFile = null;
    var data = new Blob([me], { type: 'text/plain' });
    if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);
    console.log(textFile);
    var a = document.createElement('a'); //make a link in document
    var linkText = document.createTextNode('fileLink');
    a.appendChild(linkText);

    a.href = textFile;

    a.id = 'fileLink';
    a.download = emailsubject + ".eml"; //'filenameTest.eml' ;
    a.style.visibility = "hidden";

    document.body.appendChild(a);

    document.getElementById('fileLink').click();
    document.getElementById("fileLink").remove();
}

export const mMail = (user) => {
    var mailHtm = "<h1> INVENTORY UPDATE <h1>";
    var emailto = `${user.name}@wfp.org`;
    var emailsubject = "GEMS";
    var me = 'To: ' + emailto + '\n';

    me += 'Subject: ' + emailsubject + '\n';
    me += 'X-Unsent: 1' + '\n';

    me += 'Content-Type: text/html' + '\n';
    me += '' + '\n';

    me += "<!DOCTYPE html><html style='box-sizing: border-box'xmlns:v='urn:schemas-microsoft-com:vml'xmlns:o='urn:schemas-microsoft-com:office:office'lang='en'>"
    me += "<head><title></title><meta http-equiv='Content-Type' content='text/html; charset=utf-8' /><meta name='viewport' content='width=device-width, initial-scale=1.0' /><linkhref='https://fonts.googleapis.com/css?family=Roboto'rel=' stylesheet'type='text/css'/>"
    me += "<link href='https://fonts.googleapis.com/css?family=Lato' rel=' stylesheet' type='text/css' />"
    me += "</head><body  style='background-color: #ffffff;margin: 0;padding: 0;-webkit-text-size-adjust: none;text-size-adjust: none;'>"
    me += "<table  class='nl-container' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation'  style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;background-color: #ffffff;'>"
    me += "<tbody><tr><td><table  class='row row-1' align='center' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation'  style='mso-table-lspace: 0pt; mso-table-rspace: 0pt'>"
    me += "<tbody><tr><td><table  class='row-content stack' align='center' border='0' cellpadding='0' cellspacing='0' role='presentation'  style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;color: #000000;width: 500px;'width='500'>"
    me += "<tbody><tr><td  class='column column-1' width='100%'  style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-weight: 400;text-align: left;vertical-align: top;padding-top: 5px;padding-bottom: 5px;border-top: 0px;border-right: 0px;border-bottom: 0px;border-left: 0px;'><table  class='heading_block' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation'  style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;'>"
    me += "<tr><td  style='width: 100%; text-align: center'><h1  style='margin: 0;color: #393d47;font-size: 23px;font-family: Arial, Helvetica Neue,Helvetica, sans-serif;line-height: 120%;text-align: center;direction: ltr;font-weight: 700;letter-spacing: normal;margin-top: 0;margin-bottom: 0;'>"
    me += "Inventory Assignment </h1> </td> </tr> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table  class='row row-2' align='center' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation'  style='mso-table-lspace: 0pt; mso-table-rspace: 0pt'>"
    me += "<tbody><tr><td><table  class='row-content stack' align='center' border='0' cellpadding='0' cellspacing='0' role='presentation'  style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;color: #000000;width: 500px;'width='500'>"
    me += "<tbody><tr><td  class='column column-1' width='100%'  style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-weight: 400;text-align: left;vertical-align: top;padding-top: 5px;padding-bottom: 5px;border-top: 0px;border-right: 0px;border-bottom: 0px;border-left: 0px;'><table  class='divider_block' width='100%' border='0' cellpadding='10' cellspacing='0' role='presentation'  style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;'>"
    me += "<tr><td><div align='center'><tableborder='0'cellpadding='0'cellspacing='0'role='presentation'width='100%' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;'><tr><td  class='divider_inner' style='font-size: 1px;line-height: 1px;border-top: 1px solid #bbbbbb;'><span>&#8202;</span></td></tr></table></div></td></tr>"
    me += "</table></td></tr></tbody></table></td></tr></tbody></table><table  class='row row-3'align='center'width='100%'border='0'cellpadding='0'cellspacing='0'role='presentation' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;background-color: #ffffff;'><tbody><tr><td>"
    me += "<table class='row-content stack'align='center'border='0'cellpadding='0'cellspacing='0'role='presentation' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;color: #000000;width: 500px;'width='500'><tbody><tr><td class='column column-1'width='100%' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-weight: 400;text-align: left;vertical-align: top;padding-top: 5px;padding-bottom: 5px;border-top: 0px;border-right: 0px;border-bottom: 0px;border-left: 0px;'>"
    me += "<table class='heading_block'width='100%'border='0'cellpadding='0'cellspacing='0'role='presentation' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;'><tr><td  style='width: 100%; text-align: center'><h3 style='margin: 0;color: #393d47;font-size: 15px;font-family: Arial, Helvetica Neue,Helvetica, sans-serif;line-height: 120%;text-align: center;direction: ltr;font-weight: 400;letter-spacing: normal;margin-top: 0;margin-bottom: 0;'><span  class='tinyMce-placeholder'><strong>USER</strong> -"
    me += user.name + "</span></h3></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table class='row row-4'align='center'width='100%'border='0'cellpadding='0'cellspacing='0'role='presentation' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;background-color: #f0f0f0;'>"
    me += "<tbody><tr><td><table class='row-content stack'align='center'border='0'cellpadding='0'cellspacing='0'role='presentation' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;color: #000000;width: 500px;'width='500'><tbody>"
    me += "<tr><td class='column column-1'width='100%' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-weight: 400;text-align: left;vertical-align: top;padding-top: 5px;padding-bottom: 5px;border-top: 0px;border-right: 0px;border-bottom: 0px;border-left: 0px;'>"
    me += "<table class='list_block'width='100%'border='0'cellpadding='10'cellspacing='0'role='presentation' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;word-break: break-word;'><tr><td><ul style='margin: 0;padding: 0;list-style-position: inside;color: #393d47;font-size: 24px;font-family: Arial, Helvetica Neue,Helvetica, sans-serif;font-weight: 400;line-height: 120%;text-align: center;direction: ltr;letter-spacing: 0px;'>" + `<a href='https://wfp-inventory.web.app/mail/${user._id}/' style='margin-bottom: 10px;'>Click Here </a>` + "</ul></td></tr></table>"
    me += "</td></tr></tbody></table></td></tr></tbody></table> <table class='row row-5'align='center'width='100%'border='0'cellpadding='0'cellspacing='0'role='presentation'"
    me += " style='mso-table-lspace: 0pt; mso-table-rspace: 0pt'><tbody><tr><td><table class='row-content stack'align='center'border='0'cellpadding='0'cellspacing='0'role='presentation' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;color: #000000;width: 500px;'width='500'><tbody><tr><td class='column column-1'width='100%' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-weight: 400;text-align: left;vertical-align: top;padding-top: 5px;padding-bottom: 5px;border-top: 0px;border-right: 0px;border-bottom: 0px;border-left: 0px;'><table class='divider_block'width='100%'border='0'cellpadding='10'cellspacing='0'role='presentation' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;'><tr><td>"
    me += "<div align = 'center'> <tableborder='0'cellpadding = '0'cellspacing = '0'role = 'presentation'width = '100%' style = 'mso-table-lspace: 0pt;mso-table-rspace: 0pt;'> <tr><td class='divider_inner' style='font-size: 1px;line-height: 1px;border-top: 1px solid #bbbbbb;'><span>&#8202;</span></td></tr></table></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table> <table class='row row-6'align = 'center'width = '100%'border = '0'cellpadding = '0'cellspacing = '0'role = 'presentation' style = 'mso-table-lspace: 0pt;mso-table-rspace: 0pt;background-color: #efeded;'> <tbody><tr><td><table class='row-content stack'align='center'border='0'cellpadding='0'cellspacing='0'role='presentation' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;color: #000000;width: 500px;'width='500'><tbody>"
    me += "<tr> <td class='column column-1'width = '33.333333333333336%' style = 'mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-weight: 400;text-align: left;vertical-align: top;border-top: 0px;border-right: 0px;border-bottom: 0px;border-left: 0px;'> <table class='image_block'width = '100%'border = '0'cellpadding = '0'cellspacing = '0'role = 'presentation' style = 'mso-table-lspace: 0pt;mso-table-rspace: 0pt;'> <tr><td style='width: 100%;padding-right: 0px;padding-left: 0px;padding-top: 5px;padding-bottom: 5px;'></td></tr></table></td> <td class='column column-2'width = '66.66666666666667%' style = 'mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-weight: 400;text-align: left;vertical-align: top;border-top: 0px;border-right: 0px;border-bottom: 0px;border-left: 0px;'> <table class='paragraph_block'width = '100%'border = '0'cellpadding = '0'cellspacing = '0'role = 'presentation' style = 'mso-table-lspace: 0pt;mso-table-rspace: 0pt;word-break: break-word;'> "
    me += "<tr> <td style='padding-top: 15px;padding-right: 10px;padding-bottom: 15px;padding-left: 10px;'> <div style='color: #fe4a49;font-size: 14px;font-family: Arial, Helvetica Neue,Helvetica, sans-serif;font-weight: 700;line-height: 120%;text-align: center;direction: ltr;letter-spacing: 0px;'> <p  style='margin: 0'>"
    me += "Action Required - Place E-Signature.</p></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table class='row row-7'align='center'width='100%'border='0'cellpadding='0'cellspacing='0'role='presentation' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;background-color: #dc701a;'><tbody><tr><td><table class='row-content stack'align='center'border='0'cellpadding='0'cellspacing='0'role='presentation' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;color: #000000;width: 500px;'width='500'><tbody><tr><td class='column column-1'width='33.333333333333336%' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-weight: 400;text-align: left;vertical-align: top;border-top: 0px;border-right: 0px;border-bottom: 0px;border-left: 0px;'><table class='image_block'width='100%'border='0'cellpadding='0'cellspacing='0'role='presentation' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;'><tr><td style='width: 100%;padding-right: 0px;padding-left: 0px;padding-top: 5px;padding-bottom: 5px;'><div align='center'  style='line-height: 10px'><img src='https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/804399_788268/editor_images/45dcecf2-369c-449f-aa7b-8d2303502c0d.png' style='display: block;height: auto;border: 0;width: 167px;max-width: 100%;'width='167'/></div></td></tr></table></td><td class='column column-2'width='66.66666666666667%' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-weight: 400;text-align: left;vertical-align: top;border-top: 0px;border-right: 0px;border-bottom: 0px;border-left: 0px;'><table class='paragraph_block'width='100%'border='0'cellpadding='0'cellspacing='0'role='presentation' style='mso-table-lspace: 0pt;mso-table-rspace: 0pt;word-break: break-word;'><tr><td style='padding-top: 45px;padding-right: 10px;padding-bottom: 15px;padding-left: 10px;'><div style='color: #000000;font-size: 14px;font-family: Arial, Helvetica Neue,Helvetica, sans-serif;font-weight: 700;line-height: 120%;text-align: left;direction: ltr;letter-spacing: 0px;'>"
    me += "<p  style = 'margin: 0'> Powered by: WFP IT Sri Lanka</p></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></body></html>"

    var textFile = null;
    var data = new Blob([me], { type: 'text/plain' });
    if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);
    console.log(textFile);
    var a = document.createElement('a'); //make a link in document
    var linkText = document.createTextNode('fileLink');
    a.appendChild(linkText);

    a.href = textFile;

    a.id = 'fileLink';
    a.download = emailsubject + ".eml"; //'filenameTest.eml' ;
    a.style.visibility = "hidden";

    document.body.appendChild(a);

    document.getElementById('fileLink').click();
    document.getElementById("fileLink").remove();
}
export const createMail = (user) => {
    var mailHtm = "<h1> INVENTORY UPDATE <h1>";
    var emailto = `${user.name}@wfp.org`;
    var emailsubject = "GEMS";
    var me = 'To: ' + emailto + '\n';
    me += 'Bcc: ' + 'nirthanasundaram.muhunthan@wfp.org' + '\n';

    me += 'Subject: ' + emailsubject + '\n';
    me += 'X-Unsent: 1' + '\n';

    me += 'Content-Type: text/html' + '\n';
    me += '' + '\n';

    me += "<!DOCTYPE html ><html xmlns:v='urn:schemas-microsoft-com:vml' xmlns:o='urn:schemas-microsoft-com:office:office' lang='en'><head><title></title>"
    me += "<meta http-equiv='Content-Type' content='text/html; charset=utf-8'>"
    me += "<meta name='viewport' content='width=device-width, initial-scale=1.0'>"
    me += "<link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>"
    me += "<link href='https://fonts.googleapis.com/css?family=Lato' rel='stylesheet' type='text/css'></head>"
    me += "<body style='background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;'>"
    me += "<table class='nl-container' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;'><tbody><tr><td>"
    me += "<table class='row row-1' align='center' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'><tbody><tr><td>"
    me += "<table class='row-content stack' align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;' width='500'>"
    me += "<tbody><tr><td class='column column-1' width='100%' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;'>"
    me += "<table class='heading_block' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'><tr>"
    me += "<td style='text-align:center;width:100%;'><h1 style='margin: 0; color: #393d47; direction: ltr; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 23px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;'><span class='tinyMce-placeholder'>Inventory Assignment</span></h1>"
    me += "</td></tr></table></td></tr></tbody></table></td></tr></tbody></table>"
    me += "<table class='row row-2' align='center' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'><tbody><tr><td>"
    me += "<table class='row-content stack' align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;' width='500'>"
    me += "<tbody><tr><td class='column column-1' width='100%' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;'>"
    me += "<table class='divider_block' width='100%' border='0' cellpadding='10' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'>"
    me += "<tr><td><div align='center'><table border='0' cellpadding='0' cellspacing='0' role='presentation' width='100%' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'><tr>"
    me += "<td class='divider_inner' style='font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;'><span>&#8202;</span></td>"
    me += "</tr></table></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table>"
    me += "<table class='row row-3' align='center' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;'><tbody><tr><td>"
    me += "<table class='row-content stack' align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;' width='500'><tbody><tr>"
    me += "<td class='column column-1' width='100%' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;'>"
    me += "<table class='heading_block' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'>"
    me += "<tr><td style='text-align:center;width:100%;'><h3 style='margin: 0; color: #393d47; direction: ltr; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 15px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;'><span class='tinyMce-placeholder'><strong>USER</strong> - " + user.name + "</span></h3>"
    me += "</td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table class='row row-4' align='center' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'><tbody><tr><td>"
    me += "<table class='row-content stack' align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;' width='500'><tbody><tr>"
    me += "<td class='column column-1' width='100%' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;'>"
    me += "<table class='divider_block' width='100%' border='0' cellpadding='10' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'><tr><td><div align='center'>"
    me += "<table border='0' cellpadding='0' cellspacing='0' role='presentation' width='100%' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'><tr>"
    me += "<td class='divider_inner' style='font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;'><span>&#8202;</span></td></tr></table></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table>"
    me += "<table class='row row-5' align='center' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'><tbody><tr><td>"
    me += "<table class='row-content stack' align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;' width='500'><tbody><tr>"
    me += "<td class='column column-1' width='100%' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;'>"
    me += "<table class='button_block' width='100%' border='0' cellpadding='10' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'><tr><td>"
    me += "<div align='center'><a href='https://wfp-inventory.web.app/" + `mail/${user._id}` + "' target='_blank' style='font-size:20px;text-decoration:none;display:inline-block;color:#ffffff;background-color:#3da34a;border-radius:4px;width:auto;border-top:1px solid #8a3b8f;font-weight:400;border-right:1px solid #8a3b8f;border-bottom:1px solid #8a3b8f;border-left:1px solid #8a3b8f;padding-top:15px;padding-bottom:15px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;'>"
    me += "<span style='padding-left:20px;padding-right:20px;font-size:12px;display:inline-block;letter-spacing:normal;'><span style='font-size: 12px; line-height: 2; word-break: break-word; mso-line-height-alt: 24px;'>Click Here</span></span></a></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table class='row row-6' align='center' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'>"
    me += "<tbody><tr><td><table class='row-content stack' align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;' width='500'><tbody><tr>"
    me += "<td class='column column-1' width='100%' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;'>"
    me += "<table class='heading_block' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'><tr><td style='width:100%;text-align:center;'>"
    me += "<h3 style='margin: 0; color: #b9304d; font-size: 15px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; line-height: 120%; text-align: center; direction: ltr; font-weight: 700; letter-spacing: normal; margin-top: 0; margin-bottom: 0;'><span class='tinyMce-placeholder'>Create your E-Signature By Clicking Above Button</span></h3>"
    me += "</td></tr></table></td></tr></tbody></table></td></tr></tbody></table>"
    me += "<table class='row row-7' align='center' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ebe2da;'><tbody><tr><td>"
    me += "<table class='row-content stack' align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;' width='500'><tbody><tr>"
    me += "<td class='column column-1' width='33.333333333333336%' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;'>"
    me += "<table class='image_block' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'><tr>"
    me += "<td style='width:100%;padding-right:0px;padding-left:0px;padding-top:5px;padding-bottom:5px;'>"
    me += "<div align='center' style='line-height:10px'><img src='https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/804399_788268/editor_images/45dcecf2-369c-449f-aa7b-8d2303502c0d.png' style='display: block; height: auto; border: 0; width: 167px; max-width: 100%;' width='167'></div></td></tr></table></td>"
    me += "<td class='column column-2' width='66.66666666666667%' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;'>"
    me += "<table class='paragraph_block' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;'><tr>"
    me += "<td style='padding-bottom:15px;padding-left:10px;padding-right:10px;padding-top:45px;'>"
    me += "<div style='color:#000000;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:14px;font-weight:700;letter-spacing:0px;line-height:120%;text-align:left;'>"
    me += "<p style='margin: 0;'>Powered by : WFP IT Sri Lanka</p></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></body></html>"
    var textFile = null;
    var data = new Blob([me], { type: 'text/plain' });
    if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);
    console.log(textFile);
    var a = document.createElement('a'); //make a link in document
    var linkText = document.createTextNode('fileLink');
    a.appendChild(linkText);

    a.href = textFile;

    a.id = 'fileLink';
    a.download = emailsubject + ".eml"; //'filenameTest.eml' ;
    a.style.visibility = "hidden";

    document.body.appendChild(a);

    document.getElementById('fileLink').click();
    document.getElementById("fileLink").remove();
}