# PreFly List Checker 📝
A tiny Node CLI tool to make sure you don't forget anything. Slightly glorified todo checklist.

Still under construction, it's my first time doing Node CLI tooling :wrench:

Here's a simple sample:

![](https://i.imgur.com/CuAyqD2.png)

## How to use
```
$ prefly create [fileName]
```
To create a new checklist! It then asks you to for items to add to the checklist. After creating a checklist from the console, your checklist would look like this:

![](https://i.imgur.com/HUdiqNz.png)

If you want, you can write the checklist yourself and you can make it look like so:

![](https://i.imgur.com/iy7yabZ.png)

Once you have a checklist, you can check it like so:
```
$ prefly check [fileName]
```
To check the checklist on file `fileName` (or `checklist.json`) by default.

Lets say that you need to run the checklist before every time you release, and you need to cancel you operation if you don't meet every item on your list? then you should pass `-c` or `--critical` to the `check` command. For example, lets say that you run thru the list to make sure you want to print your nuclear launch codes to the screen! Your command would look like this:
```
$ prefly check --critical ./nuclearLaunchChecklist.json&&echo $NUCLEAR_CODES 
```
If you don't pass the checklist, you don't get the nuclear codes! Everyone wins!

This is still under construction and forever considering improvements to it. 

:dizzy: Enjoy! 
