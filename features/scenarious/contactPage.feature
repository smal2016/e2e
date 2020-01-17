@talenya
Feature: Test contact page

  @e2e-1
  Scenario: Contact form, required fields
    Given I open Contact page by direct url
    Then I see Contact form
    When I submit form
    Then I see Email field is highlighted in red
    When I fill Email field with value: smolkov983@gmail.com
    Then I submit form and expect status 200

  @e2e-2
  Scenario: Contact form, optional field
    Given I open Home page by direct url
    When I click on footer "Contact us" button and go to Contact page
    Then I see Contact form
    When I fill First name field with value: name
    And I fill Last name field with value: surname
    And I fill Phone field with value: 123456789
    And I fill Company field with value: my company
    And I fill Job title field with value: my job
    And I select about us value: Outbound Sales
    And I submit form
    Then I see Email field is highlighted in red
    When I fill Email field with value: smolkov983@gmail.com
    Then I submit form and expect status 200
