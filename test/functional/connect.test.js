const { launchCompass, quitCompass} = require('./support/spectron-support');

describe.skip('#connect', function() {
  this.slow(30000);
  this.timeout(60000);
  let app = null;
  let client = null;

  before(function() {
    return launchCompass()
      .then(function(application) {
        app = application;
        client = application.client;
      });
  });

  after(function() {
    return quitCompass(app);
  });

  context('when connecting to a server', function() {
    context('when the server exists', function() {
      it('renders the home screen', function() {
        return client
          .waitForConnectView()
          .cickFillInFormLink()
          .waitForStatusBar()
          .clickConnectButton()
          .waitForHomeView()
          .getDatabasesTabText().should.eventually.equal('Databases');
      });

      it('displays the instance details', function() {
        return client
          .getInstanceHeaderDetails().should.eventually.equal('My Cluster');
      });
    });
  });
});
