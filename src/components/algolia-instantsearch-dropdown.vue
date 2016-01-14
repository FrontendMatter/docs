<template>
	<dropdown class="form-group"
		v-el:dropdown 
		@closed.tk.dropdown="searchValue=null">
		<input type="text" 
			:id="searchBoxId"
			class="form-control"
			v-model="searchValue"
			aria-haspopup="true" />
		<ul class="dropdown-menu" role="listbox">
			<dropdown-menu
				v-for="hit in searchHits"
				:model="hit" aria-item-role="option">
			</dropdown-menu>
		</ul>
	</dropdown>
</template>

<script>
	import instantsearch from 'instantsearch.js'
	import randString from 'mout/random/randString'
	import { Dropdown, DropdownMenu } from 'themekit-vue'

	export default {
		data () {
			return {
				searchValue: null,
				instantHits: []
			}
		},
		props: {
			algoliaAppId: {
				type: String,
				required: true
			},
			algoliaApiKey: {
				type: String,
				required: true
			},
			algoliaIndex: {
				type: String,
				required: true
			},
			searchBoxPlaceholder: {
				type: String,
				default: 'Search ...'
			},
			transformHit: {
				default () {
					return (hit) => {
						return hit
					}
				}
			}
		},
		computed: {
			searchBoxId () {
				return `search-box-${ randString() }`
			},
			searchHits () {
				return this.instantHits.map(this.transformHit)
			},
			searchBox () {
				return document.querySelector(`#${ this.searchBoxId }`)
			},
			dropdown () {
				return this.$els.dropdown
			}
		},
		methods: {
			keydown (e) {
				const keys = [38, 40, 27]
				if (keys.indexOf(e.which) === -1) {
					return
				}

				e.preventDefault()
				e.stopPropagation()

				const KEY_UP = e.which === 38
				const KEY_DOWN = e.which === 40
				const KEY_ESC = e.which === 27

				const isOpen = this.searchValue
				const parent = this.dropdown

				let items = $.makeArray(
					parent.querySelectorAll('[role="listbox"] > li:not(.disabled) a')
				)
				.filter((item) => {
					return item.offsetWidth || item.offsetHeight
				})

				if (!isOpen && !KEY_ESC || isOpen && KEY_ESC) {
					if (KEY_ESC) {
						e.target.focus()
					}
					this.searchValue = null
					return
				}

				if (!items.length) {
					return
				}

				let index = items.indexOf(e.target)
				if (KEY_UP && index === 0) {
					index = items.length
				}
				if (KEY_UP && index > 0) {
					index-- 
				}
				if (KEY_DOWN && index === items.length - 1) {
					index = 0
				}
				else if ((KEY_DOWN) && index < items.length - 1) {
					index++
				}
				if (index < 0) {
					index = 0
				}
				items[index].focus()
			},
			dropdownHits () {
				return {
					getConfiguration: () => ({ hitsPerPage: 5 }),
					render: ({ results }) => {
						this.instantHits = results.hits
					}
				}
			},
			openDropdown () {
				this.$broadcast('open.tk.dropdown')
			},
			closeDropdown () {
				this.$broadcast('close.tk.dropdown', null, true)
			}
		},
		created () {
			this.search = instantsearch({
				appId: this.algoliaAppId,
				apiKey: this.algoliaApiKey,
				indexName: this.algoliaIndex
			})
		},
		ready () {
			this.searchBox.addEventListener('keydown', this.keydown)
			this.dropdown.querySelector('[role="listbox"]').addEventListener('keydown', this.keydown)
			this.search.addWidget(
				instantsearch.widgets.searchBox({
					container: this.searchBox,
					placeholder: this.searchBoxPlaceholder
				})
			)
			this.search.addWidget(
				instantsearch.widgets.dropdownHits = this.dropdownHits()
			)
			this.search.start()
		},
		beforeDestroy () {
			this.searchBox.removeEventListener('keydown', this.keydown)
			this.dropdown.querySelector('[role="listbox"]').removeEventListener('keydown', this.keydown)
		},
		watch: {
			searchValue (value) {
				if (value) {
					this.openDropdown()
					this.searchBox.setAttribute('aria-expanded', 'true')
				}
				else {
					this.closeDropdown()
					this.searchBox.setAttribute('aria-expanded', 'false')
				}
			}
		},
		components: {
			Dropdown,
			DropdownMenu
		}
	}
</script>