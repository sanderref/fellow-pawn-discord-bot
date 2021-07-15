# fellow-pawn-discord-bot

some of the features I think would be amazing are very difficult to implement. first we look at what the best bots have and we emulate it making it better
This message was written when I was away so I wasn't able to check and provide sources so basically this is what I know should be done:


Basic Info-------------
Name: Fellow Pawn
playing message: playing chess to make fewer mistakes

policy for a command should be when someone uses it the command should delete almost immediately and the bot response would follow 
though there are some exceptions to this rule 


----------Now here is where the line gets blurry on what is and what isn't for the public bot. With a project like this I know
that if I was the dev I would want my bot everywere. Some of these "features" you can call them are only for the server 
or rather I only see them working within the context of the server . With the commands where you callenge opponents, the fun commands and potentially
play blindfold chess there is no doubt that they are public..but with the welcome message, logs and custom roles is where it gets
tricky. Let me know how we should solve this-------------


Server stuff-------------
Give everyone in the server the team role

The default role on the server for anyone who joins should be: Pawn

in the log section there should be when a user joins and leaves..bans,kicks and mutes 

when a user joins there should be a message such as:
welcome @user. Everyone wave!

the reaction attach being a wave and when the waves exceed a number the bot can say something fun..
for double points the bock can know when it's a repeat user and say:
welcome back @user. We missed you. Everyone wave!


Server Roles-------------
not everything can be planned with roles and so perhaps when the user joins it will ping them 3 minutes later in the bot
command channel (if they haven't already) to connect their lichess/chess.com account.
The API is pretty managable i'd like to think and when they connect to either or both it would give them a role that 
corresponds to their rating. 
The rating ranges fall into the roles as follows:
2500 = H8
2100 = G7
1800 = F6
1500 = E5
1200 = D4
1000 = C3
600 = B2
200 = A1

The roles really should act as placeholders in that they an be changed easily if switched up
titles have their own role such as FM IM GM = FIDE Master, International Master, Grand Master etc


Fun Commands-------------
!joke
(tells a chess related joke)

!opening 
searches for opening or gives a random one if no paramater is specified.
eg !opening ruy lopez

!player
searches for chess player or gives a random one if no paramater is specified.
eg !player magnus carlsen


!8ball
like 8ball with the random responses. The twist is that it responds with emojis from the chess.com engine like blunder 
or inaccuracy. If you don't know what I mean I'll show you

!puzzle (difficulty)
Generates a puzzle from a well known site
solution is attached but hidden as spoiler


Auto Responses-------------
game link
this is already a feature for some bots I know of. Essentially when you post a link to your chess game it plays it 
back as a gif at a relatively medium speed. Great for showing games with friend disgussions
