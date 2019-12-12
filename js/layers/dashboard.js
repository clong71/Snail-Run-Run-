export function createDashboardLayer(font, playerEnv) {
    const LINE1 = font.size;
    const LINE2 = font.size * 2;

    const coins = 13;
    const score = 24500;

    return function drawDashboard(context) {
        const {score, time} = playerEnv.playerController;

        font.print('SnailRun', context, 16, LINE1);
        font.print(score.toString().padStart(6, '0'), context, 16, LINE2);

        font.print('SNAIL', context, 152, LINE1);
        font.print('TOPIA', context, 160, LINE2);
    };
}
