/**
 * Created by garando on 3/9/17.
 * 

 */
var mail =
" On Fri, 9 Apr 2010 05:58:32 -0400 (EDT), Ionel Mugurel Ciobîcă wrote:" +

"   I just migrate my desktop from lenny to squeeze and after installing all" +
" new packages and reboot the system hang at the boot process asking for" +
"   the root password because it can't find /dev/sdaX, where X=2,6,7,8,9." +
" All are valid partitions. root is /dev/sda5 and it is the only partition" +
" mounted. fdisk /dev/sda says that /dev/sda not found. Indeed ls /dev/sd*" +
" shows only /dev/sdY, with Y=c,d,e,f,f1, no /dev/sdZ, where Z=a*,b*. I" +
" try MAKEDEV sda but it says that because .udev is present it must abort." +

"   I can't use the system in this state. Any ideas?" +

" If nothing I will try to boot with knoppix or the net-install testing CD" +
" and chroot into the system to attempt a kernel compilation. But I am not" +
" sure if the kernel is problematic at the moment." +

"   Migrating from Lenny to Squeeze (or any migration, really) is tricky." +
"   You can't just change your /etc/apt/sources.list file to point to the" +
" squeeze repositories and then do aptitude update;aptitude full-upgrade." +
"   The problem you are describing above is only the first of your problems" +
" if you have done that.  You need to follow the upgrade outline mentioned" +
" in the Release Notes.  You didn't say how you did it, and it's too late" +
" in any case, but I just wanted to mention that while we're on the subject." +
" Me and Krissie Brandan would be there. " +
"" +

" Assuming that you did the migration properly, this may be a device name" +
" issue.  There's been some problems with device names recently, particularly" +
" with IDE hard disks.  It hasn't happened to me, but others have reported" +
" device names going from /dev/hdx to /dev/sdx and back again with" +
"   subsequent maintenance.  You may have to boot from a rescue disk," +
"   edit your /etc/fstab to change device names, according to what they" +
" are now, and rebuild your initial RAM file system." +

"   If that is the issue, an alternative to traditional device names is" +
" to use UUIDs." +

" Cordially, Alaniya Regan. "

  ,

  mail2 = " Dear Dr. Ronald, "+

"I look forward to meeting you on Thursday, May 23, to further discuss the business incubation programme that was designed by the World Bank. Thursday evening is a good time for me." +

"  Two of my associates, Jay Abraham and Robert Kiyosaki, are planning to meet with you at Lehigh Valley as well. We are very excited to be a part of this project, especially being in the same team with you. " +

  " Cheers, Steve Henning. ",


  mail3 = "  05/05/2010, at 23:35, S. M. Henning escribió:" +

"We are Mac@LehighValley or M@LV.  The Lehigh Valley is aka Allentown-Bethlehem-Easton, PA. " +
"" +
"  We are a diverse group with retirees, computer professionals, other professionals, educators, and some children that come with there parents.  We meet in a nursing home but no one from the nursing home is a member.  One member does volunteer work there.  Our meeting place is in a dining area with WiFi/Airport available.  We are very fortunate to be near Dave Marra, Apple Senior Systems Engineer, who is a speaker at many MUGs including ours." +
"" +
"  Our meetings involve both member presentation and invited guests.  We always try to answer questions and solve problems.  We have a local Apple Store that has been absolutely zero help except some of our members always have the latest gizmos, like iPads, the day they are introduced.  We also have several Apple vendors and an Apple third party manufacturer in the area.  They are much more of a help." +
"" +
"  Since we don't have any major common interests except Mac/Apple, we normally stick with Apple software and low-cost or no-cost third party software.  We don't do many programs on Adobe products but do some on Microsoft products.  Some members are into other Unix systems such as Linux and open-source software." +

"  Our president is a Graphic Designer so our newsletter is always a real treat. " +

"  We draw members from quite a distance since we are about all there is is Southeast Pennsylvania outside the Philadelphia area. " +

"  Cheers, Steve Henning, Membership Director, Apple Ambassador, Webmaster "


  ;



var r = nlp(mail3)
  // .nouns().toSingular();
  .places(),
  // .dates(),
  // .sentences().toNegative();
  // .match('#Person');
  // .people(),
res = r
  // .data();
.out('text');

// var Knwl = require("knwl.js");
//
// var knwlInstance = new Knwl('english');
// res =  knwlInstance(mail3)
//   .get('places');
// document.write(
//   res
// );
console.log(res);