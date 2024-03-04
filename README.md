# WordPress Frontend Loader

![](https://github.com/zerosonesfun/wordpress-frontend-loader/blob/main/assets/banner-1544x500.png)

A loading spinner for WordPress which senses ajax requests, link clicks, and page loads. This gives your WordPress powered website native app-like power. It ignores the WordPress heartbeat because otherwise the spinner will pop up many times.

This plugin is brought to you by: SkyWolf, Billy Wilcosky, and donators like you! If this plugin helps you please buy me a coffee or two: https://www.buymeacoffee.com/billyw

## But, why jQuery?
![](https://github.com/zerosonesfun/wordpress-frontend-loader/blob/main/jQuery-Logo.png)

🄹🅀🅄🄴🅁🅈 🄵🄾🅁🄴🅅🄴🅁

Join jQrew: https://discord.com/invite/UuMRRFtqvB

jQuery will start to become smaller starting with version 4.0. jQuery is an easy way to work with Ajax; this is why a chunk of jQuery is used. Many WordPress plugins use jQuery.

## But, the spinner shows too much!

There are two sections at the beginning of the js file where you can add element selectors so that either clicks and/or Ajax related to those elements do not trigger the spinner.

## To do
- Add settings page so that the user can enter what to ignore there versus directly within the JS file
- Add other WordPress requirements such as the readme.txt
- Adjust to ensure approval for WordPress repository
