export default {
  props: ['page', 'total'],
  computed: {
    pagesRange() {
      const range = []
      for (let i = this.page - 3; i <= this.total && i <= this.page + 3; i++) {
        if (i >= 1) {
          range.push(i)
        }
      }
      return range
    }
  },
  methods: {
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
    <li
      class="page-item"
      @click="prevPage"
    >
      <a class="page-link" aria-label="Previous">
      <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li
      v-if="pagesRange[0] > 1"
      class="page-item"
    >
      <a
      class="page-link"
      href="#"
      >
      ...
      </a>
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
    <li
      v-if="pagesRange[pagesRange.length - 1] < total - 1"
      class="page-item"
    >
      <a
      class="page-link"
      href="#"
      >
      ...
      </a>
    </li>
    <li
      class="page-item"
      @click="nextPage"
    >
      <a class="page-link" aria-label="Next">
      <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
    </ul>
  </nav>
  `
  }