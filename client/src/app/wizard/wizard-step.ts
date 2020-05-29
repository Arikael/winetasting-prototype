export class WizardStep {
    key = '';
    text?: string;
    icon?: string;
    link?: string;
}

export class WizardConfig {
    steps: WizardStep[] = [];
    selectedStep: WizardStep = null;

    static create(steps: WizardStep[]): WizardConfig {
        return {
            selectedStep: steps[0],
            steps
        };
    }
}
