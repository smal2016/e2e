Feature: Test contact page
  Scenario: Test contact page
    Given I open contact page by direct url
    Then I see Contact form
    When I submit form
    Then I see Email field is highlighted in red
    When I fill Email field with value: smolkov983@gmail.com
    When I select about us value: Outbound Sales
    And  I submit form and expect success


