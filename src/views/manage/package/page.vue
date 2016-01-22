<template>

	<alert-notification fixed></alert-notification>

	<!-- Loading -->
	<div class="alert alert-default" v-if="serviceLoading">Loading data ...</div>
	
	<template v-if="!serviceLoading && (!isEditView || model.title)">

		<!-- Main form -->
		<form @submit.prevent="create">
			<validator name="validation">
				<div class="page-header">
					<div class="pull-right">
						<button type="button" class="btn btn-link" @click="cancel">Cancel</button>
						<button type="submit" class="btn btn-success">Save</button>
					</div>
					<h1 v-text="isEditView ? 'Edit page' : 'Create page'"></h1>
				</div>

				<div class="form-group" 
					:class="{ 'has-error': hasValidationError('title') }">
					<label for="title">Page title</label>
					<input type="text" 
						id="title"
						class="form-control" 
						v-model="model.title" 
						v-validate:title="{ required: { rule: true, message: 'The page title is required' } }"
						:autofocus="!isEditView"  />
					<p class="help-block" v-for="msg in validationMessages('title')">{{ msg }}</p>
				</div>
			</validator>

			<div class="form-group" 
				:class="{ 'has-error': hasValidationError('content', 'contentValidator') }">
				<label for="content">Content</label>

				<markdown-editor
					:model.sync="model.content"
					:validator.sync="contentValidator">
				</markdown-editor>

				<p class="help-block" v-for="msg in validationMessages('content', 'contentValidator')">{{ msg }}</p>
			</div>
			
			<!-- Main form controls -->
			<div class="form-group">
				<button type="submit" class="btn btn-success">Save</button>
				<button type="button" class="btn btn-link" @click="cancel">Cancel</button>
			</div>
		</form>
		<!-- // END Main form -->

	</template>

</template>

<script>
	import appStore from 'themekit-docs/src/js/app.store'
	import AlertNotification from 'themekit-docs/src/components/alert-notification'
	import Store from 'themekit-docs/src/mixins/store'
	import Validation from 'themekit-docs/src/mixins/validation'
	import MarkdownEditor from 'themekit-docs/src/components/markdown-editor'
	import slugify from 'mout/string/slugify'
	
	export default {
		mixins: [
			Store,
			Validation,
			AlertNotification
		],
		data () {
			return {
				appHelpers: appStore.helpers,

				// main form model
				model: {
					pageId: null,
					packageId: null,
					title: null,
					content: null,
					slug: null
				},

				contentValidator: null
			}
		},
		route: {
			canReuse: false
		},
		computed: {
			packageId () {
				return this.$route.params.id
			},
			pageId () {
				return this.$route.params.pageId
			},
			isEditView () {
				return this.pageId
			},
			valid () {
				return this.$validation.valid && this.contentValidator.valid
			}
		},
		methods: {
			create () {
				this.didSubmit = true
				if (this.valid) {
					this.model.slug = slugify(this.model.title)
					this.store.setPage(this.model, this.model.pageId).then((pageId) => {
						this.model.pageId = pageId
						this.didSubmit = false
						this.success('The page was saved.')
					})
				}
			},
			goToPackage () {
				this.$route.router.go(this.appHelpers.routeToPackagePages(this.packageId))
			},
			goToEditPage () {
				this.$route.router.go(this.appHelpers.routeToEditPage(this.packageId, this.model.pageId))
			},
			cancel () {
				this.goToPackage()
			},
			success (message) {
				this.alertNotificationSuccess(message)
				if (!this.isEditView) {
					this.goToEditPage()
				}
			}
		},
		created () {
			if (this.isEditView) {
				this.store.getPage(this.pageId).then((page) => {
					this.model = page
				})
			}
			else {
				this.model.packageId = this.packageId
			}
		},
		components: {
			AlertNotification,
			MarkdownEditor
		}
	}
</script>
