import 'colors';
const log = console.log;


const printHeader = () => {

    log('*****************************************\n'.yellow);
    log('*****************************************\n'.yellow);
    log('*********  TOY ROBOT SIMULATOR  *********\n'.yellow);
    log('*****************************************\n'.yellow);
    log('*****************************************\n'.yellow);

    log('Use the following commands to simulate the robot...'.cyan);
    log('');
    log('PLACE <x-coordinate>,<y-coordinate>,<direction>  - Initial commad to place the robot with x,y coordinates and direction the robot is facing');
    log('MOVE                                             - Move the robot one step to the direction its facing');
    log('LEFT                                             - Change the direction the robot is facing to the left side');
    log('RIGHT                                            - Change the direction the robot is facing to the right side');
    log('REPORT                                           - Output the current coordinates and direction of the robot');
    log('');
    log('*****'.red,'To Terminate the simulator, please press CTRL + C on your keyboard'.magenta,'*****'.red);
    log('');
};

export { printHeader }