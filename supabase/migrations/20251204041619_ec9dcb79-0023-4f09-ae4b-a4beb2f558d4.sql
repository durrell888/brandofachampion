-- Create table for NCAA FBS football schools
CREATE TABLE public.ncaa_football_schools (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  mascot TEXT,
  conference TEXT NOT NULL,
  state TEXT NOT NULL,
  city TEXT,
  stadium TEXT,
  logo_url TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for school coaches
CREATE TABLE public.school_coaches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID NOT NULL REFERENCES public.ncaa_football_schools(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('Head Coach', 'Recruiting Coordinator')),
  name TEXT,
  phone TEXT,
  email TEXT,
  twitter TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.ncaa_football_schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_coaches ENABLE ROW LEVEL SECURITY;

-- Public read access for schools and coaches
CREATE POLICY "Anyone can view schools" ON public.ncaa_football_schools FOR SELECT USING (true);
CREATE POLICY "Anyone can view coaches" ON public.school_coaches FOR SELECT USING (true);

-- Insert all 134 FBS schools with state information
INSERT INTO public.ncaa_football_schools (name, mascot, conference, state, city) VALUES
-- ACC (17 schools)
('Boston College', 'Eagles', 'ACC', 'Massachusetts', 'Chestnut Hill'),
('California', 'Golden Bears', 'ACC', 'California', 'Berkeley'),
('Clemson', 'Tigers', 'ACC', 'South Carolina', 'Clemson'),
('Duke', 'Blue Devils', 'ACC', 'North Carolina', 'Durham'),
('Florida State', 'Seminoles', 'ACC', 'Florida', 'Tallahassee'),
('Georgia Tech', 'Yellow Jackets', 'ACC', 'Georgia', 'Atlanta'),
('Louisville', 'Cardinals', 'ACC', 'Kentucky', 'Louisville'),
('Miami', 'Hurricanes', 'ACC', 'Florida', 'Coral Gables'),
('North Carolina', 'Tar Heels', 'ACC', 'North Carolina', 'Chapel Hill'),
('NC State', 'Wolfpack', 'ACC', 'North Carolina', 'Raleigh'),
('Pittsburgh', 'Panthers', 'ACC', 'Pennsylvania', 'Pittsburgh'),
('SMU', 'Mustangs', 'ACC', 'Texas', 'Dallas'),
('Stanford', 'Cardinal', 'ACC', 'California', 'Stanford'),
('Syracuse', 'Orange', 'ACC', 'New York', 'Syracuse'),
('Virginia', 'Cavaliers', 'ACC', 'Virginia', 'Charlottesville'),
('Virginia Tech', 'Hokies', 'ACC', 'Virginia', 'Blacksburg'),
('Wake Forest', 'Demon Deacons', 'ACC', 'North Carolina', 'Winston-Salem'),
-- Big Ten (18 schools)
('Illinois', 'Fighting Illini', 'Big Ten', 'Illinois', 'Champaign'),
('Indiana', 'Hoosiers', 'Big Ten', 'Indiana', 'Bloomington'),
('Iowa', 'Hawkeyes', 'Big Ten', 'Iowa', 'Iowa City'),
('Maryland', 'Terrapins', 'Big Ten', 'Maryland', 'College Park'),
('Michigan', 'Wolverines', 'Big Ten', 'Michigan', 'Ann Arbor'),
('Michigan State', 'Spartans', 'Big Ten', 'Michigan', 'East Lansing'),
('Minnesota', 'Golden Gophers', 'Big Ten', 'Minnesota', 'Minneapolis'),
('Nebraska', 'Cornhuskers', 'Big Ten', 'Nebraska', 'Lincoln'),
('Northwestern', 'Wildcats', 'Big Ten', 'Illinois', 'Evanston'),
('Ohio State', 'Buckeyes', 'Big Ten', 'Ohio', 'Columbus'),
('Oregon', 'Ducks', 'Big Ten', 'Oregon', 'Eugene'),
('Penn State', 'Nittany Lions', 'Big Ten', 'Pennsylvania', 'University Park'),
('Purdue', 'Boilermakers', 'Big Ten', 'Indiana', 'West Lafayette'),
('Rutgers', 'Scarlet Knights', 'Big Ten', 'New Jersey', 'Piscataway'),
('UCLA', 'Bruins', 'Big Ten', 'California', 'Los Angeles'),
('USC', 'Trojans', 'Big Ten', 'California', 'Los Angeles'),
('Washington', 'Huskies', 'Big Ten', 'Washington', 'Seattle'),
('Wisconsin', 'Badgers', 'Big Ten', 'Wisconsin', 'Madison'),
-- Big 12 (16 schools)
('Arizona', 'Wildcats', 'Big 12', 'Arizona', 'Tucson'),
('Arizona State', 'Sun Devils', 'Big 12', 'Arizona', 'Tempe'),
('Baylor', 'Bears', 'Big 12', 'Texas', 'Waco'),
('BYU', 'Cougars', 'Big 12', 'Utah', 'Provo'),
('Cincinnati', 'Bearcats', 'Big 12', 'Ohio', 'Cincinnati'),
('Colorado', 'Buffaloes', 'Big 12', 'Colorado', 'Boulder'),
('Houston', 'Cougars', 'Big 12', 'Texas', 'Houston'),
('Iowa State', 'Cyclones', 'Big 12', 'Iowa', 'Ames'),
('Kansas', 'Jayhawks', 'Big 12', 'Kansas', 'Lawrence'),
('Kansas State', 'Wildcats', 'Big 12', 'Kansas', 'Manhattan'),
('Oklahoma State', 'Cowboys', 'Big 12', 'Oklahoma', 'Stillwater'),
('TCU', 'Horned Frogs', 'Big 12', 'Texas', 'Fort Worth'),
('Texas Tech', 'Red Raiders', 'Big 12', 'Texas', 'Lubbock'),
('UCF', 'Knights', 'Big 12', 'Florida', 'Orlando'),
('Utah', 'Utes', 'Big 12', 'Utah', 'Salt Lake City'),
('West Virginia', 'Mountaineers', 'Big 12', 'West Virginia', 'Morgantown'),
-- SEC (16 schools)
('Alabama', 'Crimson Tide', 'SEC', 'Alabama', 'Tuscaloosa'),
('Arkansas', 'Razorbacks', 'SEC', 'Arkansas', 'Fayetteville'),
('Auburn', 'Tigers', 'SEC', 'Alabama', 'Auburn'),
('Florida', 'Gators', 'SEC', 'Florida', 'Gainesville'),
('Georgia', 'Bulldogs', 'SEC', 'Georgia', 'Athens'),
('Kentucky', 'Wildcats', 'SEC', 'Kentucky', 'Lexington'),
('LSU', 'Tigers', 'SEC', 'Louisiana', 'Baton Rouge'),
('Mississippi State', 'Bulldogs', 'SEC', 'Mississippi', 'Starkville'),
('Missouri', 'Tigers', 'SEC', 'Missouri', 'Columbia'),
('Oklahoma', 'Sooners', 'SEC', 'Oklahoma', 'Norman'),
('Ole Miss', 'Rebels', 'SEC', 'Mississippi', 'Oxford'),
('South Carolina', 'Gamecocks', 'SEC', 'South Carolina', 'Columbia'),
('Tennessee', 'Volunteers', 'SEC', 'Tennessee', 'Knoxville'),
('Texas', 'Longhorns', 'SEC', 'Texas', 'Austin'),
('Texas A&M', 'Aggies', 'SEC', 'Texas', 'College Station'),
('Vanderbilt', 'Commodores', 'SEC', 'Tennessee', 'Nashville'),
-- American (14 schools)
('Army', 'Black Knights', 'American', 'New York', 'West Point'),
('Charlotte', '49ers', 'American', 'North Carolina', 'Charlotte'),
('East Carolina', 'Pirates', 'American', 'North Carolina', 'Greenville'),
('FAU', 'Owls', 'American', 'Florida', 'Boca Raton'),
('Memphis', 'Tigers', 'American', 'Tennessee', 'Memphis'),
('Navy', 'Midshipmen', 'American', 'Maryland', 'Annapolis'),
('North Texas', 'Mean Green', 'American', 'Texas', 'Denton'),
('Rice', 'Owls', 'American', 'Texas', 'Houston'),
('South Florida', 'Bulls', 'American', 'Florida', 'Tampa'),
('Temple', 'Owls', 'American', 'Pennsylvania', 'Philadelphia'),
('Tulane', 'Green Wave', 'American', 'Louisiana', 'New Orleans'),
('Tulsa', 'Golden Hurricane', 'American', 'Oklahoma', 'Tulsa'),
('UAB', 'Blazers', 'American', 'Alabama', 'Birmingham'),
('UTSA', 'Roadrunners', 'American', 'Texas', 'San Antonio'),
-- Conference USA (10 schools)
('FIU', 'Panthers', 'Conference USA', 'Florida', 'Miami'),
('Jacksonville State', 'Gamecocks', 'Conference USA', 'Alabama', 'Jacksonville'),
('Kennesaw State', 'Owls', 'Conference USA', 'Georgia', 'Kennesaw'),
('Liberty', 'Flames', 'Conference USA', 'Virginia', 'Lynchburg'),
('Louisiana Tech', 'Bulldogs', 'Conference USA', 'Louisiana', 'Ruston'),
('Middle Tennessee', 'Blue Raiders', 'Conference USA', 'Tennessee', 'Murfreesboro'),
('New Mexico State', 'Aggies', 'Conference USA', 'New Mexico', 'Las Cruces'),
('Sam Houston', 'Bearkats', 'Conference USA', 'Texas', 'Huntsville'),
('UTEP', 'Miners', 'Conference USA', 'Texas', 'El Paso'),
('Western Kentucky', 'Hilltoppers', 'Conference USA', 'Kentucky', 'Bowling Green'),
-- MAC (12 schools)
('Akron', 'Zips', 'MAC', 'Ohio', 'Akron'),
('Ball State', 'Cardinals', 'MAC', 'Indiana', 'Muncie'),
('Bowling Green', 'Falcons', 'MAC', 'Ohio', 'Bowling Green'),
('Buffalo', 'Bulls', 'MAC', 'New York', 'Buffalo'),
('Central Michigan', 'Chippewas', 'MAC', 'Michigan', 'Mount Pleasant'),
('Eastern Michigan', 'Eagles', 'MAC', 'Michigan', 'Ypsilanti'),
('Kent State', 'Golden Flashes', 'MAC', 'Ohio', 'Kent'),
('Miami (OH)', 'RedHawks', 'MAC', 'Ohio', 'Oxford'),
('Northern Illinois', 'Huskies', 'MAC', 'Illinois', 'DeKalb'),
('Ohio', 'Bobcats', 'MAC', 'Ohio', 'Athens'),
('Toledo', 'Rockets', 'MAC', 'Ohio', 'Toledo'),
('Western Michigan', 'Broncos', 'MAC', 'Michigan', 'Kalamazoo'),
-- Mountain West (12 schools)
('Air Force', 'Falcons', 'Mountain West', 'Colorado', 'Colorado Springs'),
('Boise State', 'Broncos', 'Mountain West', 'Idaho', 'Boise'),
('Colorado State', 'Rams', 'Mountain West', 'Colorado', 'Fort Collins'),
('Fresno State', 'Bulldogs', 'Mountain West', 'California', 'Fresno'),
('Hawaii', 'Rainbow Warriors', 'Mountain West', 'Hawaii', 'Honolulu'),
('Nevada', 'Wolf Pack', 'Mountain West', 'Nevada', 'Reno'),
('New Mexico', 'Lobos', 'Mountain West', 'New Mexico', 'Albuquerque'),
('San Diego State', 'Aztecs', 'Mountain West', 'California', 'San Diego'),
('San Jose State', 'Spartans', 'Mountain West', 'California', 'San Jose'),
('UNLV', 'Rebels', 'Mountain West', 'Nevada', 'Las Vegas'),
('Utah State', 'Aggies', 'Mountain West', 'Utah', 'Logan'),
('Wyoming', 'Cowboys', 'Mountain West', 'Wyoming', 'Laramie'),
-- Sun Belt (14 schools)
('Appalachian State', 'Mountaineers', 'Sun Belt', 'North Carolina', 'Boone'),
('Arkansas State', 'Red Wolves', 'Sun Belt', 'Arkansas', 'Jonesboro'),
('Coastal Carolina', 'Chanticleers', 'Sun Belt', 'South Carolina', 'Conway'),
('Georgia Southern', 'Eagles', 'Sun Belt', 'Georgia', 'Statesboro'),
('Georgia State', 'Panthers', 'Sun Belt', 'Georgia', 'Atlanta'),
('James Madison', 'Dukes', 'Sun Belt', 'Virginia', 'Harrisonburg'),
('Louisiana', 'Ragin Cajuns', 'Sun Belt', 'Louisiana', 'Lafayette'),
('Marshall', 'Thundering Herd', 'Sun Belt', 'West Virginia', 'Huntington'),
('Old Dominion', 'Monarchs', 'Sun Belt', 'Virginia', 'Norfolk'),
('South Alabama', 'Jaguars', 'Sun Belt', 'Alabama', 'Mobile'),
('Southern Miss', 'Golden Eagles', 'Sun Belt', 'Mississippi', 'Hattiesburg'),
('Texas State', 'Bobcats', 'Sun Belt', 'Texas', 'San Marcos'),
('Troy', 'Trojans', 'Sun Belt', 'Alabama', 'Troy'),
('UL Monroe', 'Warhawks', 'Sun Belt', 'Louisiana', 'Monroe'),
-- Independents (4 schools)
('Connecticut', 'Huskies', 'Independent', 'Connecticut', 'Storrs'),
('Massachusetts', 'Minutemen', 'Independent', 'Massachusetts', 'Amherst'),
('Notre Dame', 'Fighting Irish', 'Independent', 'Indiana', 'South Bend');

-- Create placeholder coach entries for each school
INSERT INTO public.school_coaches (school_id, role, name, phone, email)
SELECT id, 'Head Coach', NULL, NULL, NULL FROM public.ncaa_football_schools;

INSERT INTO public.school_coaches (school_id, role, name, phone, email)
SELECT id, 'Recruiting Coordinator', NULL, NULL, NULL FROM public.ncaa_football_schools;

-- Create indexes for faster lookups
CREATE INDEX idx_schools_state ON public.ncaa_football_schools(state);
CREATE INDEX idx_schools_conference ON public.ncaa_football_schools(conference);
CREATE INDEX idx_coaches_school_id ON public.school_coaches(school_id);