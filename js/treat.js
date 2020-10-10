// The Enemy class will contain information about the enemy such as
// its position on screen. It will also provide methods for updating
// and destroying the enemy.
class Treat {
    constructor(theRoot, treatSpot) {
        this.root = theRoot;
        this.spot = treatSpot;
        this.x = treatSpot * TREAT_WIDTH;
        this.y = -TREAT_HEIGHT;
        this.destroyed = false;
        this.domElement = document.createElement('img');
        this.domElement.src = './images/heart.png';
        this.domElement.style.position = 'absolute';
        this.domElement.style.left = `${this.x}px`;
        this.domElement.style.top = `${this.y}px`;
        this.domElement.style.zIndex = 5;
        theRoot.appendChild(this.domElement);
        this.speed = Math.random() / 2 + 0.25;
    }

    update(timeDiff) {
        this.y = this.y + timeDiff * this.speed;
        this.domElement.style.top = `${this.y}px`;
        if (this.y > GAME_HEIGHT) {
            this.root.removeChild(this.domElement);
            this.destroyed = true;
        }
    }
}
