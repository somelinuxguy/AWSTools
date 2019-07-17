#!/bin/python
import boto
import boto.ec2
import sys

# print the Name tag, with tabs, or just ??? if there is none.
def name(i):
  if 'Name' in i.tags:
    n = i.tags['Name']
  else:
    n = '???'
  if len(n) < 8:
    n = n + '\t' 
  return n
  
# print the Env tag, with tabs, or just ??? if there is none.
def tagged(i):
  if 'Env' in i.tags:
    n = i.tags['Env'] + '\t'
  else:
    n = '???' + '\t'
  if 'Role' in i.tags:
    n = n + i.tags['Role'] + '\t'
  else:
    n = n + '???' + '\t'    
  return n

def print_instance(i):
    print name(i) + '\t\t' + i.private_ip_address + '\t\t' + tagged(i)
  
# Get the actual list of inventory in to reservations using the connection object 
# method "get_all_instances" with a filter. Loop over the reservations to get instances
# then print them.
def list_inv(argv):
  if str(sys.argv[1]) == '-a':
    reservations = conn.get_all_instances(filters={'instance-state-name' : 'running'})
    for r in reservations:
      for i in r.instances:
        print_instance(i)       
  elif str(sys.argv[1]) == '-s':
    reservations = conn.get_all_instances(filters={'tag:Env' : 'stg', 'instance-state-name' : 'running'})
    for r in reservations:
      for i in r.instances:
        print_instance(i)
  elif str(sys.argv[1]) == '-p':
    reservations = conn.get_all_instances(filters={'tag:Env' : 'prod', 'instance-state-name' : 'running'})
    for r in reservations:
      for i in r.instances:
        print_instance(i)

# Change this string to your region of preference.
region='us-west-2'  
conn = boto.ec2.connect_to_region(region)
if len(sys.argv) >= 2:
  list_inv(sys.argv[1:])
else:
  print "Need to provide a single valid switch of -a -s -p"
  sys.exit(2)