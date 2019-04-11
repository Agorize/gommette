const basePropsData = {
  value: 'my name',
  field: {
    inputType: 'text',
    inputName: 'last_name',
    placeholder: 'Your last name',
    required: true,
    validations: 'required'
  }
}

const modelPropsData = {
  value: 'my name',
  field: {
    inputType: 'text',
    model: 'last_name',
    inputName: 'last_name',
    placeholder: 'Your last name',
    required: true,
    validations: 'required'
  },
}

// render cases for computed hasErrors
export const renderCaseHasErrors = [
  [
    'when there are no vee-validate and data base errors',
    {
      data () {
        return {
          displayFieldsErrors: false,
        }
      },
      propsData: basePropsData,
      computed: {
        hasErrorVeeValidate: () => false,
        fieldModelErrors: () => [],
      }
    },
    false
  ],
  [
    'when there are vee-validate errors',
    {
      data () {
        return {
          displayFieldsErrors: false,
        }
      },
      propsData: basePropsData,
      computed: {
        hasErrorVeeValidate: () => true,
        fieldModelErrors: () => [],
      }
    },
    true
  ],
  [
    'when there are database errors but display fields error is not activated',
    {
      data () {
        return {
          displayFieldsErrors: false,
        }
      },
      propsData: basePropsData,
      computed: {
        hasErrorVeeValidate: () => false,
        fieldModelErrors: () => ['required'],
      }
    },
    false
  ],
  [
    'when there are database errors and display fields error is activated',
    {
      data () {
        return {
          displayFieldsErrors: true,
        }
      },
      propsData: basePropsData,
      computed: {
        hasErrorVeeValidate: () => false,
        fieldModelErrors: () => ['required'],
      }
    },
    true
  ],
  [
    'when there are database errors and vee-validate errors. Display fields error is activated',
    {
      data () {
        return {
          displayFieldsErrors: true,
        }
      },
      propsData: basePropsData,
      computed: {
        hasErrorVeeValidate: () => true,
        fieldModelErrors: () => ['required'],
      }
    },
    true
  ]
]

// render cases for computed hasErrors
export const renderCaseFieldModelErrors = [
  [
    // describe
    'when there are errors which are not according to field model',
    // options propsData
    {
      ...modelPropsData,
      errorsModel: [
        { 'code': 'required', 'source': '/data/attributes/first_name' },
        { 'code': 'email', 'source': '/data/attributes/first_name' },
      ],
    },
    // expect value
    []
  ],
  [
    // describe
    'when there is one error which is according to field model',
    // options propsData
    {
      ...modelPropsData,
      errorsModel: [
        { 'code': 'required', 'source': '/data/attributes/last_name' },
        { 'code': 'email', 'source': '/data/attributes/first_name' },
      ],
    },
    // expect value
    ['required']
  ],
  [
    // describe
    'when there is are all errors which are according to field model',
    // options propsData
    {
      ...modelPropsData,
      errorsModel: [
        { 'code': 'required', 'source': '/data/attributes/last_name' },
        { 'code': 'email', 'source': '/data/attributes/last_name' },
      ],
    },
    // expect value
    ['required', 'email']
  ],
]
