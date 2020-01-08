Feature: Test contact page
  Scenario: Test contact page
    Given I open contact page by direct url
    Then I see Contact form
    When I submit form
    Then I see Email field is highlighted in red
    When I fill Email field with value: test@email.test
    And  I submit form and expect success


