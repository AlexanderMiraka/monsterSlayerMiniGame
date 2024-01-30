/* eslint-disable */
import { createApp } from 'vue/dist/vue.esm-bundler'
import App from './App.vue'

createApp({
    data () {
        return {
            playerHealth:100,
            monsterHealth:100,
            currentRound: 0,
            winner: null,
            battlelog: []
        }
    },
    computed: {
        monsterBarStyles() {
            if(this.monsterHealth <= 0) {
                return {width: '0%',}
            }
            else {
                return {width: this.monsterHealth + '%'};
            }
        },
        playerBarStyles () {
            if(this.playerHealth <= 0) {
                return {width: '0%',}
            }
            else if (this.playerHealth >= 100) {
                return {width: '100%'}
            }
            else {
                return {width: this.playerHealth + '%'};
            }
        },
        checkSpecial() {
            if(this.currentRound%3==0) {
                return false;
            }
            else {
                return true;
            }
        },
    },
    watch: {
        playerHealth(value){
            if(value < 0 && this.monsterHealth <= 0) {
                this.winner = 'draw';
                this.battlelog.push('player wins');
            }
            else if (value < 0) {
                this.winner = 'monster';
                this.battlelog.push('monster wins');
            }
        },
        monsterHealth(value){
            if(value < 0 && this.playerHealth <= 0) {
                this.winner = 'draw';
                this.battlelog.push('Draw');
            }
            else if (value < 0) {
                this.winner = 'player';
                this.battlelog.push('player wins');
            }
        }
    },
    methods: {
        startNewGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.battlelog = [];
        },
        attackMonster() {
            let damage = getRandValue(1,12);
            this.monsterHealth -= damage;
            this.attackPlayer();
            this.currentRound++;
            this.battlelog.push('Player attacks for' + damage);
        },
        attackPlayer() {
            let damage = getRandValue(5,15);
            this.playerHealth -= damage;
            this.battlelog.push('Monster attacks for' + damage);
        },
        specialAttackMonster() {
                let damage = getRandValue(10,25);
                this.monsterHealth -= damage;
                this.attackPlayer();
                this.currentRound++;
                this.battlelog.push('player special attacks for' + damage);
        },
        healPlayer() {
            if(this.playerHealth <= 100 && this.playerHealth > 0) {
                let heal = getRandValue(10,15);
                this.playerHealth += heal;
                this.battlelog.push('player heals for' + heal);
            }
            this.attackPlayer();
            this.currentRound++;
        },
        surrender() {
            this.playerHealth = 0;
            this.winner = 'monster';
        }

    }
}).mount('#game');

function getRandValue(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}