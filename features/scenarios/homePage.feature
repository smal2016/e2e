@test
Feature: Google
  @e2e-1
  Scenario Outline: Search
    Given I open Google page by direct url
    When I fill search field with value: <searchValue>
    And I submit form
    Then I see results match with <searchValue>

    Examples:
    |searchValue|
    |Puppeteer  |

