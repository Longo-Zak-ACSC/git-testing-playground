GIT TESTING PLAYGROUND IS FOR: 

	- PRACTICING COMMANDS AND MANIPULATIONS WITH GIT.
	- CREATING, DELETING, MOVING, COPYING, AND EDITING FILES.
	- CREATING, DELETING, CHERRY-PICKING, MERGING, AND DELETING GIT BRANCHES.




****************************************************************************
GIT BASH common comands :: QUICK REFERENCE

(recommend creating a test directory somewhere (mkdir git-testing-playground) or to rename a directory (mv old-directory git-testing-playground), navigating to it, run "git init", create some files with touch "touch index.html", edit it with "vim index.html", view your directory with "ls -la", remove files with rm "rm index.html", and try these git commands out in safety)

[command line typical commands: mkdir, rmdir, touch, rm, mv, ls -la]

****************************************************************************

- change directory to git repo

cd /c/[path to where your git repo resides]

-------------------------------------------------------------------

- see LOCAL branches and branch you are on (asterisk indicated)

git branch


- see LOCAL & REMOTE branches

git branch -a

-------------------------------------------------------------------

- check the status of the branch you are on

git status

-------------------------------------------------------------------

- switch to a branch

git checkout [branch name]

-------------------------------------------------------------------

- update LOCAL branch references to match references on REMOTE

git fetch --prune 

------------------------------------------------------------------

- pull REMOTE branch file changes to your LOCAL branch

git pull

-----------------------------------------------------------------

- make a new branch based on another branch

git checkout [branch I am mirroring] <-- IN MOST CASES, THIS WILL BE qa FOR US
git fetch --prune
git pull

git checkout -b [new branch name] [branch to mirror] <-- CREATES NEW BRANCH AND SWITCHES TO IT
git push --set-upstream origin [new branch name] 

-----------------------------------------------------------------

- delete a LOCAL branch that was pushed to create a REMOTE version, then deleted after a merged pull request

git checkout qa
git fetch --prune <-- CHECK THE RETURNED LIST TO MAKE SURE IT SHOWS YOUR BRANCH WAS DELETED ON THE REMOTE
git branch <-- CHECK TO SEE YOUR BRANCH IS STILL SHOWING LOCALLY
git branch -d [name of branch to delete]

-----------------------------------------------------------------

- delete a local branch that was never pushed

git checkout [any other local branch]
git branch -d [branch to delete]

-----------------------------------------------------------------

- see difference between your LOCAL repo and the REMOTE repo

git checkout [branch to diff]
git gui

*press the X to close the git gui

-----------------------------------------------------------------

- commit your changes and add a commit message (required)

git commit -a -m "my message about the commit goes here"

----------------------------------------------------------------

- see difference between two branches

*first checkout one of the branches you want to diff (git checkout [The-Branch-Name])

git diff [branch-to-compare-to]

*if the diff opens vim (a default command-line text editor) in your console, don't panic! You can exit vim by [ESC --> :q --> ENTER]

---------------------------------------------------------------

- merge two of your local branches

*switch to the branch with the latest changes

git merge [name-of-branch-to-merge-into-current-branch]


*if it is an easy merge, git will auto merge it

*if it is not an easy merge, git will let you know there are conflicts merging, and will await instructions

----------------------------------------------------------------

- to abort a merge with conflicts

git merge --abort

----------------------------------------------------------------

- to manually merge a file

vim [name of file]

#
vim common commands
i = insert (you type i to be able to edit the text of the file)
d = delete (out of insert mode, d will delete selections)
ESC = escapes you out of a mode, so you can issue new commands or save and quit
:q ENTER = quit without saving changes
:wq ENTER = quit and save changes
#

*git wraps merge conflicts in text that looks lik <<<<<<<, >>>>>>>, and ======, so delete all of these when you are merging manually

----------------------------------------------------------------

- to tell git your manual merge is done

git add [name-of-file-you-merged]

*running "git status" will show that your merge conflicts are resolved, and you are ready to commit the change

------------------------------------------------------------------

- unstaging all changes and files you staged with "git add", but haven't yet comitted

git reset

*unstages all staged files
*won't erase changes to the unstaged files
*won't delete files

------------------------------------------------------------------

- unstage and remove all staged/uncomitted files and changes in your whole branch

*WARNING*

git reset --hard

*unstages all staged files
*removes all changes to staged files
*deletes all staged files that were not previously comitted!!! <-- if you create a new file, "git add" (stage it), then run "git reset --hard" git will unstage the file and delete it
*will not removed or alter unstaged files

-------------------------------------------------------------------

- add notes to current or specific commit that already has a message on it

*to add notes to current commit
git notes add -m "I am notating this commit, because I forgot some pertinent info"

*to add notes to a specified commit by specifying the commit's hash
git notes add 315793cebdbea8ab8d114d1f450e776a5d799c1a -m "added some notes to this commit as a test" 

-------------------------------------------------------------------



