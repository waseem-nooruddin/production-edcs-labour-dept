import { Page, Locator } from "@playwright/test";

export class EmployeeApprovePage {
  constructor(private readonly page: Page) {}

  ///search employee

  async searchEmployeeId(employeeId: string) {
    await this.page.locator("#outlined-basic").fill(employeeId);
    await this.page.getByRole("button", { name: "Search" }).click();
  }

  async clickApproveButton() {
    await this.page.getByText("Approve", { exact: true }).click();
  }

  async clickApproveConfirm() {
    await this.page.getByText('Confirm', { exact: true }).click();
  }

  async clickApproveConfirmButton() {
    await this.page.getByRole("button", { name: "Continue" }).click();
  }
}
