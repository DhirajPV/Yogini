import urllib.request
'''
Instructions: Move txt file into the same directory this file, and replace 'Half_Moon..." with
the correct name. The pictures will be saved in the same directory
'''
with open('Half_Moon_Pose_or_Ardha_Chandrasana_.txt', 'r') as f:
   pose_num = 0
   num_urls_to_scrape = 60
   for line in f:
       if pose_num > num_urls_to_scrape: break
       line_arr = line.split("http")
       url = "http" + line_arr[-1].strip()
       print(url)
       posename = "Ardha_Chandrasana"
       filename = posename + "_" + str(pose_num)
       pose_num += 1
       try:
           urllib.request.urlretrieve(url, filename)
       except ValueError:
           print("something went wrong")
       except KeyboardInterrupt:
           raise KeyboardInterrupt("Exiting...")
           
       except:
           print("the link mite b dead")
