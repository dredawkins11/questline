class PromptError extends Error {
    constructor() {
        super();
        this.name = "Prompt Error";
        this.message =
            "This prompt couldn't be understood. Please try to be more specific in order to achieve better results.";
    }
}

export default PromptError