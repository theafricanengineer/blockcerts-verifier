export default [
  {
    'code': 'formatValidation',
    'name': 'Format validation',
    'status': 'failure',
    'substeps': [{
      'code': 'getTransactionId',
      'name': 'Getting transaction ID',
      'parentStep': 'formatValidation',
      'status': 'success',
      'substeps': []
    }, {
      'code': 'computeLocalHash',
      'name': 'Computing local hash',
      'parentStep': 'formatValidation',
      'status': 'success',
      'substeps': []
    }, {
      'code': 'fetchRemoteHash',
      'errorMessage': 'Could not confirm the transaction',
      'name': 'Fetching remote hash',
      'parentStep': 'formatValidation',
      'status': 'failure',
      'substeps': []
    }]
  },
  {'code': 'hashComparison', 'name': 'Hash comparison', 'status': 'standby', 'substeps': []}, {
    'code': 'statusCheck',
    'name': 'Status check',
    'status': 'standby',
    'substeps': []
  }
];
