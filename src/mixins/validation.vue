<script>
	export default {
		data () {
			return {
				didSubmit: false
			}
		},
		methods: {
			getValidator (name) {
				return this['$' + name]
			},
			getValidatorField (validatorName, fieldName) {
				let validator = this.getValidator(validatorName)
				if (!validator) {
					return null
				}
				return validator[fieldName] || null
			},
			hasValidationError (validatorName, fieldName) {
				let validatorField = this.getValidatorField(validatorName, fieldName)
				if (validatorField) {
					return (validatorField.dirty || this.didSubmit) && 
						validatorField.invalid
				}
				return null
			},
			validationMessages (validatorName, fieldName) {
				let validatorField = this.getValidatorField(validatorName, fieldName)
				if (validatorField) {
					return validatorField ? validatorField.messages : null	
				}
				return null
			}
		}
	}
</script>