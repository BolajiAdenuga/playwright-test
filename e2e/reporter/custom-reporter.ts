/* Generates .json file with execution results
*
** This class Generates sw-results.json file that contains the data to be uploaded to Snowflake

** Data needed to use this script:
**** Configure playwright.config.ts to generate custom json file

** playwright.config.ts
  reporter: 
  [
    ['./e2e/reporter/custom-reporter.ts'],
  ],
**
*/

import type { FullConfig, FullResult, Reporter, Suite, TestCase, TestError, TestResult, TestStep } from '@playwright/test/reporter';
import { writeFileSync } from 'fs';
var fs = require('fs');
import { join } from 'path';

var testSuite: object = {};
var testCaseList: object[] = [];
var testStepList: object[] = [];
const projectId: string = "TEMPLATE_PROJECT";
var executionId: string = '';

class CustomReporter implements Reporter
{
  async onBegin(config: FullConfig, suite: Suite) 
  {
    console.log(`Starting the run with ${suite.allTests().length} tests`);
    executionId = await this.generateRandomId("EX");
    console.log('Generating execution id: ' + executionId);
  }
  
  async onTestBegin(test: TestCase, result: TestResult)
  {
    console.log(`Starting test ${test.title}`);
  }

  async onStepBegin(test: TestCase, result: TestResult, step: TestStep): Promise<void> 
  {
    // Filtering by actual test case steps
    if(step.category === 'test.step')
    {
      console.log(`Starting step ${step.title}` );
    }
  }
    
  async onStepEnd(test: TestCase, result: TestResult, step: TestStep): Promise<void> 
  {
    // Initializing status as true until error occurs
    let status = true;

    // Filtering by actual test case steps
    if(step.category === 'test.step')
    {
      if(step.error) 
      {
        // Changing status to false on test case error
        status = false 
      }
    
      // Creating test step object
      let testStep: object = 
      {
        title: step.title,
        status: status,
        duration: step.duration,
        error: step.error?.message   
      }
      
      // Adding each step to the list
      testStepList.push(testStep);
      console.log(`Finished step ${step.title} with duration ${step.duration}`);
    }  
  }

  async onError(error: TestError): Promise<void> {
    console.log('Error location: ' + error.location);
    console.log('Error message: ' + error.message);
    console.log('Error stack: ' + error.stack);
  }

  async onStdErr(chunk: string | Buffer, test: void | TestCase, result: void | TestResult): Promise<void> {
    console.log('Log ERROR: ' + chunk);
  }

  async onStdOut(chunk: string | Buffer, test: void | TestCase, result: void | TestResult): Promise<void> {
    console.log('Log INFO: ' + chunk); 
  }
  
  async onTestEnd(test: TestCase, result: TestResult) 
  {
    console.log(`Finished test ${test.title}: ${result.status}`);

    // Creating test case object
    let testCase = 
    {
      title: test.title,
      result: test.ok,
      status: result.status,
      executionTime: result.startTime,
      steps: testStepList
    }

    // Adding each test case to the list
    testCaseList.push(testCase);

    // Empty testStepList for the next test case
    testStepList = [];   
  }
  
  async onEnd(result: FullResult) 
  {
    console.log(`Finished the run: ${result.status}`);

    // Creating test suite object
    testSuite  = 
    {
      "executionId": executionId,
      "id": projectId,
      "project": "Template Project",
      "testCases": testCaseList,
    };

    // Writing result to json file
    let dir = './test-results/custom';
    
    if (!fs.existsSync(dir))
    {
      fs.mkdirSync(dir, { recursive: true });
      console.log('Creating dir and saving sw-results.json in ' + join(dir, 'sw-results.json'));
      writeFileSync(join(dir, 'sw-results.json'), JSON.stringify(testSuite, null, 2), { flag: 'w', });
    }
    else
    {
      console.log('Saving sw-results.json in ' + join(dir, 'sw-results.json'));
      writeFileSync(join(dir, 'sw-results.json'), JSON.stringify(testSuite, null, 2), { flag: 'w', });
    }
  }

  async generateRandomId(itemType: string): Promise<string>
  {
    let id: string = '';
    let inOptions: string = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 32; i++) 
    {
      id += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
    }
    return projectId + '-' + itemType + '-' +  id;
  }
}
  
export default CustomReporter;