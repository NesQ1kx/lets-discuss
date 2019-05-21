package mobile.lab3.note.common;

import javax.validation.*;
import java.util.Set;

public class ModelValidator<T> {
    public void validate(T model) throws ValidationException {
        Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
        Set<ConstraintViolation<T>> violations = validator.validate(model);

        for (ConstraintViolation<T> violation : violations) {
            throw new ValidationException(violation.getMessage());
        }
    }
}
