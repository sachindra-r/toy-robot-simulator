
## <u><h3>Simple NodeJS Toy Robot Simulator Using CLI</h3></u>
>## <u>Installation</u>

1. Install locally by running `npm install`
2. Execute the command (This will start the simulator) `npm start`

>## <u>Constrains</u> 
* Commands make the robot fall over the table will be ignored <br/>
* Initial place over the given range is also not allowed

>## <u>Commands to stimulate the robot</u>
 * PLACE \<x-coordinate>,\<y-coordinate>,\<direction>  - Initial commad to place the robot with x,y coordinates and direction the robot is facing <br/>
* MOVE - Move the robot one step to the direction its facing <br/>
* LEFT - Change the direction the robot is facing to the left side <br/>
* RIGHT - Change the direction the robot is facing to the right side <br/>
* REPORT - Output the current coordinates and direction of the robot <br/>

>## <u>Unit Test</u>

- Unit testing can be executed by running `npm test`