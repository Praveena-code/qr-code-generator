/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
//use module
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

//prompt user for URL
inquirer
  .prompt([
    {
      type: 'input',
      name: 'url',
      message: 'Enter a URL to generate a QR code:',
    },
  ])
  .then((answers) => {
    const url = answers.url;

    //generate QR code
    const qrCodeImage = qr.image(url);

    //save QR code image to file
    qrCodeImage.pipe(fs.createWriteStream('qrcode.png'));

    //save user input to txt file
    fs.writeFile('user_input.txt', url, (err) => {
      if (err) throw err;
      console.log('User input saved to user_input.txt');
    });

    console.log('QR code generated and saved as qrcode.png');
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  
  