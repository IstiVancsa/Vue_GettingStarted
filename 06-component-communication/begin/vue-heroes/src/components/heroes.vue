<template>
  <div class="content-container">
    <div class="section content-title-group">
      <h2 class="title">Heroes</h2>
      <div class="columns">
        <div class="column is-8" v-if="heroes">
          <!-- <heroes-list> -->
          <ul v-if="!selectedHero">
            <li v-for="hero in heroes" :key="hero.id">
              <div class="card">
                <div class="card-content">
                  <div class="content">
                    <div :key="hero.name" class="name">
                      {{ hero.firstName }} {{ hero.lastName }}
                    </div>
                    <div class="description">{{ hero.description }}</div>
                  </div>
                </div>
                <footer class="card-footer">
                  <button
                    class="link card-footer-item"
                    @click="selectHero(hero)"
                  >
                    <i class="fas fa-check"></i>
                    <span>Select</span>
                  </button>
                </footer>
              </div>
            </li>
          </ul>
          <!-- <heroes-list> -->

          <!-- <hero-detail> -->
          <HeroDetail 
              v-if="selectedHero" 
              :hero="selectedHero"
              @cancel="cancelHero"
              @save="saveHero"/>
          <!-- </hero-detail> -->

          <div class="notification is-info" v-show="message">{{ message }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeroDetail from '@/components/hero-detail';
import { ourHeroes, lifecycleHooks, heroWatchers, logger } from '../shared';

export default {
  name: 'Heroes',
  data() {
    return {
      heroes: [],
      selectedHero: undefined,
      message: '',
    };
  },
  components: { HeroDetail },
  mixins: [lifecycleHooks, heroWatchers],
  created() {
    this.loadHeroes();
    logger.info(`${this.componentName} created hook called`);
  },
  methods: {
    async getHeroes() {
      return new Promise(resolve => {
        setTimeout(() => resolve(ourHeroes), 1500);
      });
    },
    async loadHeroes() {
      this.heroes = [];
      this.message = 'getting the heroes, please be patient';
      this.heroes = await this.getHeroes();
      this.message = '';
    },
    selectHero(hero) {
      this.selectedHero = hero;
    },
    saveHero(newHero) {
      const index = this.heroes.findIndex(x => x.id === newHero.id);
      this.heroes.splice(index, 1, newHero);
      this.heroes = [...this.heroes];
      this.selectedHero = undefined;
    },
    cancelHero() {
      console.log("cancel fired");
      this.selectedHero = undefined;
    }
  },
};
</script>
