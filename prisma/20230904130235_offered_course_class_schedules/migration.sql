-- Create the OfferedCourseClassSchedule table

CREATE TABLE
    offered_course_class_schedule (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        start_time VARCHAR(255),
        end_time VARCHAR(255),
        day_of_week VARCHAR(255),
        -- Corrected typo here
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ,
        offered_course_section_id UUID,
        semester_registration_id UUID,
        room_id UUID,
        faculty_id UUID,
        FOREIGN KEY (offered_course_section_id) REFERENCES offered_course_section(id),
        FOREIGN KEY (semester_registration_id) REFERENCES semester_registration(id),
        FOREIGN KEY (room_id) REFERENCES room(id),
        FOREIGN KEY (faculty_id) REFERENCES faculty(id)
    );