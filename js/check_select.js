export default {
  data() {
    return {
      expanded: false,
      checked: {},
    }
  },
  mounted() {
    const self = this;
    document.addEventListener('click', (e) => {
      if (this.expanded && !this.isDescendant(this.$refs.root, e.target)) {
        this.trigger();
      }
    });
  },
  props: {
    options: {
      type: Object,
      defulat: {},
    },
    defaultText: {
      type: String,
      default: 'select an option',
    },
  },
  created() {
    for (const group of Object.keys(this.options)){
      this.checked[group] = [];
    }
  },
  computed: {
    option_groups() {
      return Object.keys(this.options);
    },
    selected_description() {
      const values = Object.entries(this.checked).reduce((s, [group, selected]) => {
        if (selected.length > 0) {
          const names = this.options[group].options.reduce((n, opt) => {
            if (selected.indexOf(opt.value) >= 0) {
              n.push(opt.name);
            }
            return n;
          }, []);
          s.push(names.join(','));
        }
        return s;
      }, []);

      if (values.length > 0) {
        return values.join(';');
      }
      return this.defaultText;
    },
  },
  watch: {
    checked: {
      deep: true,
      immediate: true,
      handler() {
        this.$emit('select-change', this.checked);
      },
    },
  },
  methods: {
    trigger() {
      this.expanded = !this.expanded;
    },
    isDescendant(parent, child) {
      var node = child.parentNode;
      while (node != null) {
        if (node == parent) {
          return true;
        }
        node = node.parentNode;
      }
      return false;
    },
  },
  template: `
  <div class="multiselect" ref="root">
    <div class="select-box" @click="trigger()">
      <select class="form-select">
        <option>{{ selected_description }}</option>
      </select>
      <div class="menu-prevent"></div>
    </div>
    <div class="check-select" v-show="expanded">
      <div v-for="group in option_groups" :key="group">
        <div>{{ options[group].group }}</div>
        <div class="option form-chek" v-for="opt in options[group].options" :key="opt">
          <input type="checkbox" class="form-check-input" :key="opt" :value="opt.value" v-model="checked[group]">
          <label class="form-check-label">{{ opt.name }}</label>
        </div>
      </div>
    </div>
  </div>
  `,
}