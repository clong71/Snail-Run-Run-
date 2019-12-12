import Entity from '../Entity.js';
import Go from '../traits/Go.js';
import Jump from '../traits/Jump.js';
import Killable from '../traits/Killable.js';
import Physics from '../traits/Physics.js';
import Solid from '../traits/Solid.js';
import Stomper from '../traits/Stomper.js';
import {loadSpriteSheet} from '../loaders.js';

const SLOW_DRAG = 1/1000;
const FAST_DRAG = 1/5000;

export function loadSnail() {
    return loadSpriteSheet('snail')
    .then(createSnailFactory);
}

function createSnailFactory(sprite) {
    const runAnim = sprite.animations.get('run');

    function routeFrame(snail) {
        if (snail.jump.falling) {
            return 'jump';
        }

        if (snail.go.distance > 0) {
            if ((snail.vel.x > 0 && snail.go.dir < 0) || (snail.vel.x < 0 && snail.go.dir > 0)) {
                return 'break';
            }
            
            if (snail.pos.x >= 3328) {
                location.replace("youWon.html");
            }
            
            if (snail.pos.y > 208) {
                location.replace("gameOver.html");
            } 

            return runAnim(snail.go.distance);
        }

        return 'idle';
    }

    function setTurboState(turboOn) {
        this.go.dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG;
    }

    function drawSnail(context) {
        sprite.draw(routeFrame(this), context, 0, 0, this.go.heading < 0);
    }

    return function createSnail() {
        const snail = new Entity();
        snail.size.set(14, 16);

        snail.addTrait(new Physics());
        snail.addTrait(new Solid());
        snail.addTrait(new Go());
        snail.addTrait(new Jump());
        snail.addTrait(new Killable());
        snail.addTrait(new Stomper());

        snail.killable.removeAfter = 0;

        snail.turbo = setTurboState;
        snail.draw = drawSnail;

        snail.turbo(false);

        return snail;
    }
}
