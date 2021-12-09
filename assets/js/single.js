var issueContainerEl = document.querySelector('#issues-container');

var getRepoIssues = function (repo) {
  var apiUrl = 'https://api.github.com/repos/' + repo + '/issues?direction=asc';

  // successful response,
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        // passes response data to the dom function
        displayIssues(data);
      });
    } else {
      alert('There was a problem with your response!');
    }
  });
};

var displayIssues = function (issues) {
  if (issues.length === 0) {
    issueContainerEl.textContent = 'This repo has no open issues!';
    return;
  }

  for (var i = 0; i < issues.length; i++) {
    // creats link element, takes user to issues on Github
    var issueEl = document.createElement('a');
    issueEl.classList = 'list-item flex-row justify-space-between align-center';
    issueEl.setAttribute('href', issues[i].html_url);
    issueEl.setAttribute('target', '_blank');

    // creates span to hold issue title
    var titleEl = document.createElement('span');
    titleEl.textContent = issues[i].title;

    issueEl.appendChild(titleEl);

    // create type element
    var typeEl = document.createElement('span');

    // check if issue is an actual issue or pull request
    if (issues[i].pull_request) {
      typeEl.textContent = '(Pull request)';
    } else {
      typeEl.textContent = '(Issue)';
    }
    issueEl.appendChild(typeEl);
    issueContainerEl.appendChild(issueEl);
  }
};

getRepoIssues('facebook/react');
