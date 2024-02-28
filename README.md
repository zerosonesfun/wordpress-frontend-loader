# WordPress Frontend Loader

![image](https://github.com/zerosonesfun/wordpress-frontend-loader/blob/main/fel-icon.jpeg)

A minimal loading spinner plugin which uses very little code and uses a CSS only spinner. It works as soon as a link is clicked and keeps spinning until the new page is fully loaded. It spins for ajax requests too.

This plugin is brought to you by: SkyWolf, Billy Wilcosky, and donators like you! If this plugin helps you please buy me a coffee or two: https://www.buymeacoffee.com/billyw

## But, why did you do XYZ?
A line of jQuery is used to show the loader during ajax events. This is to give the site an app like experience where many actions show a spinner. WordPress loads jQuery by default, so why not use it? Also, WordPress is _supposed_ to only load jQuery once as long as it is enqueued the way I have it. But, this is up for debate.

In short, this is coded to show a spinner when:
1. Clicking a link because usually clicking a link means you need something to load.
2. Loading a page.
3. Ajax requests minus the heartbeat (this line of code can be removed if you start to see the spinner too often).
