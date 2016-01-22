<template>

	<alert-notification fixed></alert-notification>

	<!-- Loading -->
	<div class="alert alert-default" v-if="serviceLoading">Loading data ...</div>
	
	<template v-if="!serviceLoading && (!isEditView || model.name)">

		<!-- Main form -->
		<form @submit.prevent="create">
			<validator name="validation">
				<div class="page-header">
					<div class="pull-right">
						<button type="button" class="btn btn-link" @click="cancel">Cancel</button>
						<button type="submit" class="btn btn-success">Save</button>
					</div>
					<h1 v-text="isEditView ? 'Edit package' : 'Create package'"></h1>
				</div>

				<div class="form-group" 
					:class="{ 'has-error': hasValidationError('name') }">
					<label for="name">Package name</label>
					<input type="text" 
						id="name"
						class="form-control" 
						v-model="model.name" 
						v-validate:name="{ required: { rule: true, message: 'The package name is required' } }"
						:autofocus="!isEditView" />
					<p class="help-block" v-for="msg in validationMessages('name')">{{ msg }}</p>
				</div>
			</validator>

			<div class="form-group">
				<label for="content">Content</label>
				<markdown-editor :model.sync="model.content"></markdown-editor>
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
					name: null,
					content: null
				}
			}
		},
		route: {
			canReuse: false
		},
		computed: {
			packageId () {
				return this.$route.params.id
			},
			isEditView () {
				return this.packageId
			},
			valid () {
				return this.$validation.valid
			}
		},
		methods: {
			create () {
				this.didSubmit = true
				if (this.valid) {
					this.store.setPackage(this.model.name, this.model).then(() => {
						this.didSubmit = false
						this.success('The package was saved.')
					})
				}
			},
			goToPackages () {
				this.$route.router.go(this.appHelpers.routeToPackages())
			},
			goToEditPage () {
				this.$route.router.go(this.appHelpers.routeToEditPackage(this.model.name))
			},
			cancel () {
				this.goToPackages()
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
				this.store.getPackage(this.packageId).then((data) => {
					this.model = data
				})
			}
		},
		components: {
			AlertNotification,
			MarkdownEditor
		}
	}
</script>
