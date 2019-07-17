# AWSTools

## inventory.py

*Synopsis:*
This script just takes the API output, finds what you want, and makes it pretty before outputting it to the terminal.

*The longer story:*
This script was written as a helper to the developers. They can execute it from the main control server, usually named something creative like "ops" which serves as a command and control server or a jump-box (sometimes called a Bastion Server but that takes too long to spell.)

The developers often find themselves facing dynamic inventory, usually with machines that have scaled in or out without any notice to them. How should they know which machine to SSH to when they are troubleshooting an issue?

I certainly don't want them logging in to the AWS admin console all the time to get lists of machines so they can just type:
`ssh 10.10.123.123`

I made this little tool, it just queries the AWS RESTful API, and gets a list of servers. I specifically filter the result for some of the common tags I use to help order the chaos of a large number of cloud servers.

This script uses boto2 and python2, which as of writing this are ubiquitous on most linux machines. I'll toss up a python3 and boto3 one in the near future though.

This script hits the AWS API, therefore *the server it runs on* needs credentials properly set up. That's out of scope of this document, but as an AWS sysadmin you should already know how to set all that up. (tough love, brother)

