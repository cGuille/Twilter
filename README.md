Make your Twitter timeline say good bye to poor TV shows you can't bear.

What is Twilter ?
=================

Twilter is a web browser extension for Chrome / Chromium designed to make you able to mute Twitter accounts or keywords on Twitter web interface.
It does not deal with Twitter API but only remove concerned tweets from the DOM as soon as they are inserted.

This project has started on June 3th 2012.
You can now use it but keep in mind that it is the first release, so it may contain some bugs.
**update: the project has stopped and since Twitter seems to have changed their HTML structure, the app is no more efficient. Future support is currently not planned.**

What Twilter do for now:
  - scan the DOM on load to remove tweets posted by the muted accounts or containing a muted keyword ;
  - scan every inserted tweets to remove those which has been posted by a muted account or which contain a muted keyword ;
  - muted accounts & keywords can be added or removed from the options page.

How to use Twilter
==================
  - 1) [Download Twilter here (Right click > Save file)](https://github.com/downloads/cGuille/Twilter/Twilter.crx) ;
  - 2) Go to chrome://extensions/ , drag-and-drop Twilter.crx into it ;
  - 3) Your browser inform you that Twilter can access to your data on twitter.com, chose "Add" to continue ;
  - 4) Twilter is now installed. You can manage your muted accounts & keyword from the extension option page, available from your browser extension page.

__If you already had a Twitter tab open before installing Twilter, you'll have to reload it in order to make Twilter run !__

Evolution & bug report
========================================
You can go to the [issues page](https://github.com/cGuille/Twilter/issues) to:
  - see which enhancements has been planned, or suggest your own ;
  - report any bug or dysfunction you have encoutered.

Licence
=======

When it will be ready, this project will be released under the GNU General Public Licence.

Privacy
=======

Once activated, Twilter can access any content there is on the Twitter web page you are visiting. We will not keep any trace of it, and only use this access to provide you the service this project has been designed for. The source code is freely available so anybody with the well suited technical skills can check that we are not cheating on you. However, if you deal with sensitive contents, you may not use any third party stuff like this.
