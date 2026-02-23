import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { NavBarPage } from "../pages/navbar.page";
import { credentials } from "./resources/credentials";
import { EmployeeRegistration } from "../pages/employee.registration.page";
import { testdata } from "./resources/testdata";
import { testdata as hrms } from "./resources/hrmstestdata";
import { HrmsPage } from "../pages/hrms.page";

test.describe("Employee Registration", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
  });
  test(
    "Verify access to Employee Registration form",
    { tag: ["@smoke", "@TC_01", "@positive"] },
    async ({ page }) => {
      await loginPage.login(credentials.username, credentials.password);
      const navBarpage = new NavBarPage(page);
      await navBarpage.openHrmsModule();
      const employeeRegistration = new EmployeeRegistration(page);
      await employeeRegistration.clickRegisterEmployee();
      expect(
        page.getByRole("heading", { name: "Employee Registration List" }),
      ).toBeVisible();

    },
  );

  test(
    "Create employee with all mandatory fields",
    { tag: ["@smoke", "@TC_02", "@positive"] },
    async ({ page }) => {
      await loginPage.login(credentials.username, credentials.password);
      const navBarpage = new NavBarPage(page);
      await navBarpage.openHrmsModule();
      const hrmsPage = new HrmsPage(page);
      await hrmsPage.clickRegisterEmployee();
      await hrmsPage.clickAddNew();
      
      //Personal Details
      await hrmsPage.selectTitle();
      await hrmsPage.enterFullName(hrms.hrms_enterFullName);
      await hrmsPage.enterSurName(hrms.hrms_enterSurName);
      await hrmsPage.selectGender();
      await hrmsPage.enterDOB(hrms.hrms_dateOfBirth);
      await hrmsPage.enterPlaceOfBirth(hrms.hrms_placeOfBirth);
      await hrmsPage.selectBloodGroup();
      await hrmsPage.enterNIC(hrms.hrms_nic);
      await hrmsPage.enterNicIssueDate(hrms.hrms_nicDateOfIssue);
      await hrmsPage.enterMaritalStatus('Married');
      await hrmsPage.clickNext();

      //Employment Details
      await hrmsPage.enterEmployeeNumber(hrms.Employee_Number);
      await hrmsPage.enterEmployeeEpfNumber(hrms.Emplloyee_EPFNumber);
      await hrmsPage.selectBranch(hrms.branchName);
      await hrmsPage.selectDivision(hrms.Division);
      await hrmsPage.selectResignedTerrminated(hrms.Resigned);
      await hrmsPage.selectEmployeeType(hrms.EmployeeType);
      await hrmsPage.enterDateOfJoin(hrms.hrms_dateOfJoin);
      await hrmsPage.enterenterworkShipCategoryI(hrms.hrms_workShipCategoryId);
      await hrmsPage.enterpriorNotiePeriod(hrms.hrms_noticeDate);
      await hrmsPage.enterConfirmationDueOn(hrms.hrms_enterConfirmationDueOn);
      await hrmsPage.enterpersonalGrade(hrms.hrms_personalGrade);
      await hrmsPage.enterCostCenter(hrms.hrms_costCenter);
      await hrmsPage.enterjobCategory(hrms.hrms_enterjobCategory);
      await hrmsPage.enterCurrentDesignation(hrms.hrms_enterCurrentDesignation);
      await hrmsPage.enterdateofDesignation(hrms.hrms_enterdateofDesignation);
      await hrmsPage.enterreportingPerson(hrms.hrms_enterreportingPerson);
      await hrmsPage.clickAddButton();
      await hrmsPage.enterpermanenetLocation(hrms.hrms_enterpermanenetLocation);
      await hrmsPage.enterTemporaryLocation(hrms.hrms_enterTemporaryLocation);
      await hrmsPage.enterfromDate(hrms.hrms_enterfromDate);
      await hrmsPage.clickLocationDetailsAddButton();

      //Contact Details

    },
  );
});