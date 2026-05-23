(function(){
const SHELTERS_BY_STATE = {
  "Alabama": [
    { name: "Greater Birmingham Humane Society", city: "Birmingham", url: "https://gbhs.org", phone: "(205) 942-1211" },
    { name: "Montgomery Humane Society", city: "Montgomery", url: "https://www.montgomeryhumane.com", phone: "(334) 409-0622" },
    { name: "Animal Rescue Foundation", city: "Huntsville", url: "https://arfhuntsville.org", phone: "(256) 881-8010" }
  ],
  "Alaska": [
    { name: "Alaska SPCA", city: "Anchorage", url: "https://www.alaskaspca.org", phone: "(907) 562-2999" },
    { name: "Fairbanks Animal Shelter", city: "Fairbanks", url: "https://www.fairbanksanimalshelter.com", phone: "(907) 459-1451" }
  ],
  "Arizona": [
    { name: "Arizona Humane Society", city: "Phoenix", url: "https://www.azhumane.org", phone: "(602) 997-7585" },
    { name: "Arizona Animal Welfare League", city: "Phoenix", url: "https://aawl.org", phone: "(602) 273-6852" },
    { name: "Pima Animal Care Center", city: "Tucson", url: "https://www.pimaanimalcare.org", phone: "(520) 724-5900" },
    { name: "Humane Society of Southern Arizona", city: "Tucson", url: "https://www.hssaz.org", phone: "(520) 327-6088" }
  ],
  "Arkansas": [
    { name: "Little Rock Animal Village", city: "Little Rock", url: "https://www.littlerock.gov/animal", phone: "(501) 376-3067" },
    { name: "Best Friends Animal Society \u2013 NWA", city: "Bentonville", url: "https://bestfriends.org", phone: "(479) 802-4944" },
    { name: "Humane Society of the Ozarks", city: "Fayetteville", url: "https://hsozarks.org", phone: "(479) 444-7387" }
  ],
  "California": [
    { name: "LA Animal Services", city: "Los Angeles", url: "https://www.laanimalservices.com", phone: "(888) 452-7381" },
    { name: "San Francisco SPCA", city: "San Francisco", url: "https://www.sfspca.org", phone: "(415) 554-3000" },
    { name: "San Diego Humane Society", city: "San Diego", url: "https://www.sdhumane.org", phone: "(619) 299-7012" },
    { name: "Sacramento SPCA", city: "Sacramento", url: "https://www.sspca.org", phone: "(916) 383-7387" },
    { name: "Pasadena Humane", city: "Pasadena", url: "https://pasadenahumane.org", phone: "(626) 792-7151" },
    { name: "Oakland Animal Services", city: "Oakland", url: "https://www.oaklandanimalservices.org", phone: "(510) 535-5602" }
  ],
  "Colorado": [
    { name: "Denver Animal Shelter", city: "Denver", url: "https://www.denvergov.org/animals", phone: "(720) 913-1311" },
    { name: "Dumb Friends League", city: "Denver", url: "https://www.ddfl.org", phone: "(303) 751-5772" },
    { name: "Humane Society of the Pikes Peak Region", city: "Colorado Springs", url: "https://www.hsppr.org", phone: "(719) 473-1741" },
    { name: "Larimer Humane Society", city: "Loveland", url: "https://www.larimerhumane.org", phone: "(970) 226-3647" }
  ],
  "Connecticut": [
    { name: "Connecticut Humane Society", city: "Newington", url: "https://cthumane.org", phone: "(860) 594-4500" },
    { name: "Animal Haven", city: "North Haven", url: "https://www.theanimalhavenct.org", phone: "(203) 239-2641" },
    { name: "Dan Cosgrove Animal Shelter", city: "Branford", url: "https://www.cosgroveanimalshelter.org", phone: "(203) 315-4125" }
  ],
  "Delaware": [
    { name: "Brandywine Valley SPCA", city: "New Castle", url: "https://bvspca.org", phone: "(302) 516-1000" },
    { name: "Delaware Humane Association", city: "Wilmington", url: "https://dehumane.org", phone: "(302) 571-0111" },
    { name: "Faithful Friends Animal Society", city: "Wilmington", url: "https://faithfulfriends.us", phone: "(302) 427-8514" }
  ],
  "Florida": [
    { name: "Humane Society of Greater Miami", city: "Miami", url: "https://www.humanesocietymiami.org", phone: "(305) 749-1800" },
    { name: "Humane Society of Broward County", city: "Fort Lauderdale", url: "https://www.humanesocietyofbroward.com", phone: "(954) 989-3977" },
    { name: "Pet Rescue by Judy", city: "Sanford", url: "https://www.petrescuebyjudy.com", phone: "(407) 302-8775" },
    { name: "SPCA Tampa Bay", city: "Tampa", url: "https://www.spcatampabay.org", phone: "(727) 586-3591" },
    { name: "Jacksonville Humane Society", city: "Jacksonville", url: "https://www.jaxhumane.org", phone: "(904) 725-8766" },
    { name: "Palm Beach County Animal Care", city: "West Palm Beach", url: "https://discover.pbcgov.org/animalcare", phone: "(561) 233-1200" }
  ],
  "Georgia": [
    { name: "Atlanta Humane Society", city: "Atlanta", url: "https://www.atlantahumane.org", phone: "(404) 875-5331" },
    { name: "Furkids Animal Rescue", city: "Atlanta", url: "https://www.furkids.org", phone: "(770) 613-0880" },
    { name: "Savannah Chatham Animal Services", city: "Savannah", url: "https://chathamcountyga.gov/animal", phone: "(912) 652-6575" },
    { name: "PAWS Atlanta", city: "Decatur", url: "https://pawsatlanta.org", phone: "(404) 370-8800" }
  ],
  "Hawaii": [
    { name: "Hawaiian Humane Society", city: "Honolulu", url: "https://www.hawaiianhumane.org", phone: "(808) 356-2200" },
    { name: "Maui Humane Society", city: "Puunene", url: "https://www.mauihumanesociety.org", phone: "(808) 877-3680" }
  ],
  "Idaho": [
    { name: "Idaho Humane Society", city: "Boise", url: "https://www.idahohumanesociety.org", phone: "(208) 342-3508" },
    { name: "Upper Valley Humane Society", city: "Rexburg", url: "https://www.uppervalleyhumanesociety.org", phone: "(208) 356-0065" }
  ],
  "Illinois": [
    { name: "PAWS Chicago", city: "Chicago", url: "https://www.pawschicago.org", phone: "(773) 935-7297" },
    { name: "Anti-Cruelty Society", city: "Chicago", url: "https://www.anticruelty.org", phone: "(312) 644-8338" },
    { name: "Animal Care League", city: "Oak Park", url: "https://www.animalcareleague.org", phone: "(708) 848-8155" },
    { name: "Anderson Animal Shelter", city: "South Elgin", url: "https://www.andersonanimalshelter.org", phone: "(847) 697-2880" }
  ],
  "Indiana": [
    { name: "IndyHumane", city: "Indianapolis", url: "https://indyhumane.org", phone: "(317) 872-5650" },
    { name: "Indiana Animal Welfare League", city: "Indianapolis", url: "https://www.nawl.org", phone: "(317) 290-2147" },
    { name: "Humane Society for Hamilton County", city: "Fishers", url: "https://www.hamiltonhumane.com", phone: "(317) 773-4974" }
  ],
  "Iowa": [
    { name: "Animal Rescue League of Iowa", city: "Des Moines", url: "https://www.arl-iowa.org", phone: "(515) 262-9503" },
    { name: "Cedar Rapids Animal Care & Control", city: "Cedar Rapids", url: "https://www.cedar-rapids.org/animals", phone: "(319) 286-5994" }
  ],
  "Kansas": [
    { name: "Great Plains SPCA", city: "Merriam", url: "https://www.greatplainsspca.org", phone: "(913) 831-4445" },
    { name: "Kansas Humane Society", city: "Wichita", url: "https://www.kshumane.org", phone: "(316) 524-9196" },
    { name: "Helping Hands Humane Society", city: "Topeka", url: "https://www.hhhstopeka.org", phone: "(785) 233-7325" }
  ],
  "Kentucky": [
    { name: "Kentucky Humane Society", city: "Louisville", url: "https://www.kyhumane.org", phone: "(502) 366-3355" },
    { name: "Lexington Humane Society", city: "Lexington", url: "https://www.lexingtonhumanesociety.org", phone: "(859) 233-0044" }
  ],
  "Louisiana": [
    { name: "Louisiana SPCA", city: "New Orleans", url: "https://www.louisianaspca.org", phone: "(504) 368-5191" },
    { name: "Companion Animal Alliance", city: "Baton Rouge", url: "https://www.caabr.org", phone: "(225) 408-5600" }
  ],
  "Maine": [
    { name: "Animal Refuge League of Greater Portland", city: "Westbrook", url: "https://www.arlgp.org", phone: "(207) 854-9771" },
    { name: "Bangor Humane Society", city: "Bangor", url: "https://www.bangorhumane.org", phone: "(207) 942-8902" }
  ],
  "Maryland": [
    { name: "Baltimore Animal Rescue and Care Shelter", city: "Baltimore", url: "https://www.barcs.org", phone: "(410) 396-4695" },
    { name: "Montgomery County Animal Services", city: "Derwood", url: "https://www.montgomerycountymd.gov/animalservices", phone: "(240) 773-5900" },
    { name: "Anne Arundel County Animal Care & Control", city: "Millersville", url: "https://www.aacounty.org/departments/animal-care-control", phone: "(410) 222-8900" }
  ],
  "Massachusetts": [
    { name: "MSPCA-Angell", city: "Boston", url: "https://www.mspca.org", phone: "(617) 522-7400" },
    { name: "Northeast Animal Shelter", city: "Salem", url: "https://www.northeastanimalshelter.org", phone: "(978) 745-9888" },
    { name: "Animal Rescue League of Boston", city: "Boston", url: "https://www.arlboston.org", phone: "(617) 426-9170" }
  ],
  "Michigan": [
    { name: "Michigan Humane", city: "Detroit", url: "https://www.michiganhumane.org", phone: "(866) 648-6263" },
    { name: "Capital Area Humane Society", city: "Lansing", url: "https://www.cahs-lansing.org", phone: "(517) 626-6060" },
    { name: "Humane Society of West Michigan", city: "Grand Rapids", url: "https://www.hswestmi.org", phone: "(616) 453-8900" }
  ],
  "Minnesota": [
    { name: "Animal Humane Society", city: "Minneapolis", url: "https://www.animalhumanesociety.org", phone: "(763) 522-4325" },
    { name: "Secondhand Hounds", city: "Eden Prairie", url: "https://www.secondhandhounds.org", phone: "(952) 322-7643" }
  ],
  "Mississippi": [
    { name: "Mississippi Animal Rescue League", city: "Jackson", url: "https://www.msarl.org", phone: "(601) 969-1631" },
    { name: "Gulf Coast Humane Society", city: "Gulfport", url: "https://www.gchsms.org", phone: "(228) 863-4394" }
  ],
  "Missouri": [
    { name: "Humane Society of Missouri", city: "St. Louis", url: "https://www.hsmo.org", phone: "(314) 647-8800" },
    { name: "KC Pet Project", city: "Kansas City", url: "https://kcpetproject.org", phone: "(816) 513-9821" },
    { name: "Wayside Waifs", city: "Kansas City", url: "https://www.waysidewaifs.org", phone: "(816) 761-8151" }
  ],
  "Montana": [
    { name: "Humane Society of Western Montana", city: "Missoula", url: "https://www.myhumanesociety.org", phone: "(406) 549-3934" },
    { name: "Lewis & Clark Humane Society", city: "Helena", url: "https://www.lewisandclarkhumane.org", phone: "(406) 442-1660" }
  ],
  "Nebraska": [
    { name: "Nebraska Humane Society", city: "Omaha", url: "https://www.nehumanesociety.org", phone: "(402) 444-7800" },
    { name: "Capital Humane Society", city: "Lincoln", url: "https://www.capitalhumanesociety.org", phone: "(402) 441-4488" }
  ],
  "Nevada": [
    { name: "Animal Foundation", city: "Las Vegas", url: "https://animalfoundation.com", phone: "(702) 384-3333" },
    { name: "Nevada Humane Society", city: "Reno", url: "https://www.nevadahumanesociety.org", phone: "(775) 856-2000" }
  ],
  "New Hampshire": [
    { name: "NH SPCA", city: "Stratham", url: "https://www.nhspca.org", phone: "(603) 772-2921" },
    { name: "Pope Memorial SPCA", city: "Laconia", url: "https://www.popememorialspca.org", phone: "(603) 524-3252" }
  ],
  "New Jersey": [
    { name: "St. Hubert's Animal Welfare Center", city: "Madison", url: "https://www.sthuberts.org", phone: "(973) 377-2295" },
    { name: "Associated Humane Societies", city: "Newark", url: "https://www.ahscares.org", phone: "(973) 824-7080" },
    { name: "Burlington County Animal Shelter", city: "Mount Holly", url: "https://www.co.burlington.nj.us/animals", phone: "(609) 265-5073" }
  ],
  "New Mexico": [
    { name: "Animal Humane New Mexico", city: "Albuquerque", url: "https://www.animalhumanenm.org", phone: "(505) 255-5523" },
    { name: "Santa Fe Animal Shelter", city: "Santa Fe", url: "https://sfhumanesociety.org", phone: "(505) 983-4309" }
  ],
  "New York": [
    { name: "ASPCA Adoption Center", city: "New York", url: "https://www.aspca.org", phone: "(212) 876-7700" },
    { name: "Best Friends Animal Society \u2013 NYC", city: "New York", url: "https://www.bestfriends.org/new-york", phone: "(212) 244-2363" },
    { name: "Animal Care Centers of NYC", city: "New York", url: "https://www.nycacc.org", phone: "(212) 788-4000" },
    { name: "Mohawk Hudson Humane Society", city: "Menands", url: "https://mohawkhumane.org", phone: "(518) 434-8128" },
    { name: "Rochester Animal Services", city: "Rochester", url: "https://www.cityofrochester.gov/animal-services", phone: "(585) 428-7274" }
  ],
  "North Carolina": [
    { name: "Humane Society of Charlotte", city: "Charlotte", url: "https://www.humanesocietyofcharlotte.org", phone: "(704) 377-0534" },
    { name: "SPCA of Wake County", city: "Raleigh", url: "https://www.spcawake.org", phone: "(919) 772-2326" },
    { name: "Orange County Animal Services", city: "Chapel Hill", url: "https://www.orangecountync.gov/animals", phone: "(919) 942-7387" },
    { name: "Brother Wolf Animal Rescue", city: "Asheville", url: "https://www.bfrw.org", phone: "(828) 505-3440" }
  ],
  "North Dakota": [
    { name: "Central Dakota Humane Society", city: "Mandan", url: "https://www.cdhs.net", phone: "(701) 667-2020" },
    { name: "Homeward Animal Shelter", city: "Fargo", url: "https://homewardanimalshelter.com", phone: "(701) 239-0077" }
  ],
  "Ohio": [
    { name: "Cleveland APL", city: "Cleveland", url: "https://clevelandapl.org", phone: "(216) 771-4616" },
    { name: "Columbus Humane", city: "Columbus", url: "https://www.columbushumane.org", phone: "(614) 777-7387" },
    { name: "Cincinnati Animal CARE", city: "Cincinnati", url: "https://www.cincinnati-oh.gov/animals", phone: "(513) 541-6100" },
    { name: "Toledo Humane Society", city: "Toledo", url: "https://toledohumane.org", phone: "(419) 891-0705" }
  ],
  "Oklahoma": [
    { name: "Oklahoma Humane Society", city: "Oklahoma City", url: "https://www.okhumane.org", phone: "(405) 286-1229" },
    { name: "Tulsa SPCA", city: "Tulsa", url: "https://tulsaspca.org", phone: "(918) 428-7722" }
  ],
  "Oregon": [
    { name: "Oregon Humane Society", city: "Portland", url: "https://www.oregonhumane.org", phone: "(503) 285-7722" },
    { name: "Greenhill Humane Society", city: "Eugene", url: "https://www.green-hill.org", phone: "(541) 689-1503" },
    { name: "Humane Society of Central Oregon", city: "Bend", url: "https://www.hsco.org", phone: "(541) 382-3537" }
  ],
  "Pennsylvania": [
    { name: "PSPCA (Pennsylvania SPCA)", city: "Philadelphia", url: "https://www.pspca.org", phone: "(215) 426-6300" },
    { name: "Animal Friends", city: "Pittsburgh", url: "https://www.thinkingoutsidethecage.org", phone: "(412) 847-7000" },
    { name: "Brandywine Valley SPCA", city: "West Chester", url: "https://bvspca.org", phone: "(484) 302-0865" }
  ],
  "Rhode Island": [
    { name: "Providence Animal Rescue League", city: "Providence", url: "https://www.parl.org", phone: "(401) 421-1399" },
    { name: "Potter League for Animals", city: "Middletown", url: "https://www.potterleague.org", phone: "(401) 846-8276" }
  ],
  "South Carolina": [
    { name: "Charleston Animal Society", city: "North Charleston", url: "https://www.charlestonanimalsociety.org", phone: "(843) 747-4849" },
    { name: "Greenville Humane Society", city: "Greenville", url: "https://greenvillehumane.com", phone: "(864) 242-3626" }
  ],
  "South Dakota": [
    { name: "Sioux Falls Area Humane Society", city: "Sioux Falls", url: "https://sfhumanesociety.com", phone: "(605) 338-4441" },
    { name: "Humane Society of the Black Hills", city: "Rapid City", url: "https://www.hsbh.org", phone: "(605) 394-4170" }
  ],
  "Tennessee": [
    { name: "Nashville Humane Association", city: "Nashville", url: "https://www.nashvillehumane.org", phone: "(615) 352-4663" },
    { name: "Memphis Animal Services", city: "Memphis", url: "https://www.memphisanimalservices.com", phone: "(901) 636-1416" },
    { name: "Young-Williams Animal Center", city: "Knoxville", url: "https://www.young-williams.org", phone: "(865) 215-6599" }
  ],
  "Texas": [
    { name: "Houston SPCA", city: "Houston", url: "https://www.houstonspca.org", phone: "(713) 869-7722" },
    { name: "Dallas Animal Services", city: "Dallas", url: "https://www.dallasanimalservices.org", phone: "(214) 670-8246" },
    { name: "San Antonio Pets Alive!", city: "San Antonio", url: "https://www.sanantoniopetsalive.org", phone: "(210) 876-7762" },
    { name: "Austin Pets Alive!", city: "Austin", url: "https://www.austinpetsalive.org", phone: "(512) 961-6519" },
    { name: "SPCA of Texas", city: "Dallas", url: "https://www.spca.org", phone: "(214) 742-7722" },
    { name: "El Paso Animal Services", city: "El Paso", url: "https://www.elpasotexas.gov/animal-services", phone: "(915) 212-8700" }
  ],
  "Utah": [
    { name: "Best Friends Animal Society", city: "Kanab", url: "https://bestfriends.org", phone: "(435) 644-2001" },
    { name: "Humane Society of Utah", city: "Murray", url: "https://www.utahhumane.org", phone: "(801) 261-2919" }
  ],
  "Vermont": [
    { name: "Central Vermont Humane Society", city: "East Montpelier", url: "https://www.centralvermonthumane.org", phone: "(802) 476-3811" },
    { name: "Humane Society of Chittenden County", city: "South Burlington", url: "https://www.hsccvt.org", phone: "(802) 862-0135" }
  ],
  "Virginia": [
    { name: "Richmond SPCA", city: "Richmond", url: "https://www.richmondspca.org", phone: "(804) 643-6785" },
    { name: "Animal Welfare League of Arlington", city: "Arlington", url: "https://www.awla.org", phone: "(703) 931-9241" },
    { name: "Norfolk SPCA", city: "Norfolk", url: "https://www.norfolkspca.com", phone: "(757) 622-3319" }
  ],
  "Washington": [
    { name: "Seattle Humane", city: "Bellevue", url: "https://www.seattlehumane.org", phone: "(425) 641-0080" },
    { name: "Humane Society for Tacoma & Pierce County", city: "Tacoma", url: "https://www.thehumanesociety.org", phone: "(253) 383-2733" },
    { name: "Spokane Humane Society", city: "Spokane", url: "https://spokanehumanesociety.org", phone: "(509) 467-5235" }
  ],
  "West Virginia": [
    { name: "Kanawha-Charleston Humane Association", city: "Charleston", url: "https://www.kchapets.org", phone: "(304) 342-1576" },
    { name: "Huntington Cabell Wayne Animal Shelter", city: "Huntington", url: "https://hcwanimalshelter.org", phone: "(304) 696-5551" }
  ],
  "Wisconsin": [
    { name: "Wisconsin Humane Society", city: "Milwaukee", url: "https://www.wihumane.org", phone: "(414) 264-6257" },
    { name: "Dane County Humane Society", city: "Madison", url: "https://www.giveshelter.org", phone: "(608) 838-0413" }
  ],
  "Wyoming": [
    { name: "Cheyenne Animal Shelter", city: "Cheyenne", url: "https://www.cheyenneanimalshelter.org", phone: "(307) 632-6655" },
    { name: "Sheridan Dog & Cat Shelter", city: "Sheridan", url: "https://www.sheridandogandcatshelter.com", phone: "(307) 674-7694" }
  ]
};
const US_STATES = Object.keys(SHELTERS_BY_STATE).sort();
Object.assign(window, { SHELTERS_BY_STATE, US_STATES });

})();
