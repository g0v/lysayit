export default {
  props: {
    page: Number,
    total: Number,
    chooseSize: {
      type: Number,
      default: 5,
    },
  },
  computed: {
    pagesRange() {
      const halfSize = Math.floor(this.chooseSize/2);
      const begin = Math.max(2, Math.min(this.page - halfSize, this.total - this.chooseSize));
      return this.range(begin, Math.min(begin + this.chooseSize, this.total));
    }
  },
  methods: {
    range(begin, end) {
      const range = [];
      for (let i = begin; i < end; i++) {
          range.push(i);
      }
      return range;
    },
    onClick(page) {
      this.$emit('page-change', page)
    },
    prevPage() {
      if(this.page > 1) {
        this.$emit('page-change', this.page - 1)
      }
    },
    nextPage() {
      if(this.page < this.total) {
        this.$emit('page-change', this.page + 1)
      }
    },
  },
  template: `
  <nav>
    <ul class="pagination">
    <li class="page-item" :class="{'active': 1 === page}">
      <a class="page-link" @click.stop.prevent="onClick(1)">1</a>
    </li>
    <li v-show="pagesRange[0] > 2" class="page-item disabled">
      <span class="page-link">...</span>
    </li>
    <li
      v-for="number in pagesRange"
      :key="number"
      class="page-item"
      :class="{'active': number === page}"
    >
      <a
      class="page-link"
      @click.stop.prevent="onClick(number)"
      >{{ number }}
      </a>
    </li>
    <li v-show="pagesRange[pagesRange.length - 1] < total - 1" class="page-item disabled">
      <span class="page-link">...</span>
    </li>
    <li class="page-item" :class="{'active': total === page}" v-show="total > 1">
      <a class="page-link" @click.stop.prevent="onClick(total)">{{ total }}</a>
    </li>
    </ul>
  </nav>
  `
  }