This little program connects to S3 using your aws credentials.

Then she asks for a list of buckets and tells you which ones are over 1 years old. You can change that with a const.

Then she dives in to each bucket and shows you which files have a LastModified over 3 years old. You can also adjust that.

So it helps you find old stale things you are paying for.

Sadly there is no way to tell when the file was ACCESSED with S3, only modified.

The code now is mostly me thinking out loud, so to speak. I still should:

1. Update the bucket eval to fill an object with files that meet
age criteria. So it doesnt say the name of empty buckets OR buckets with
nothing interesting in them.

2. Return the object, probably stringified. Then you can consume it
as you wish. 

3. Accept a parameter, in case you have multiple profiles in your credentials and want to switch between them easily.

4. That of course lays the groundwork to turn this all in to a microservice behind
something like Express and let you query it from your own infrastructure management portal. You have one of those, right?!
