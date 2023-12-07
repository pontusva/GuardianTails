CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    -- Other user attributes can be added as needed
);

-- Roles table
CREATE TABLE Roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL,
    -- Other role attributes can be added as needed
);

-- Junction table for the Many-to-Many relationship
CREATE TABLE UserRoles (
    user_id INT REFERENCES Users(user_id),
    role_id INT REFERENCES Roles(role_id),
    PRIMARY KEY (user_id, role_id)
); 

CREATE TABLE Pets (
    pet_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    species VARCHAR(50) NOT NULL,
    breed VARCHAR(50),
    color VARCHAR(30),
    age INT,
    last_seen_location VARCHAR(100),
    description TEXT,
    owner_id INT REFERENCES Users(user_id),
    status VARCHAR(20) CHECK (status IN ('lost', 'found'))
);

CREATE TABLE LocationHistory (
    location_id SERIAL PRIMARY KEY,
    pet_id INT REFERENCES Pets(pet_id),
    timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION
);

CREATE TABLE Reports (
    report_id SERIAL PRIMARY KEY,
    reporter_id INT REFERENCES Users(user_id),
    pet_id INT REFERENCES Pets(pet_id),
    timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    status VARCHAR(20) CHECK (status IN ('open', 'closed'))
);

CREATE TABLE ImageGallery (
    image_id SERIAL PRIMARY KEY,
    pet_id INT REFERENCES Pets(pet_id),
    image_url VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE CommunicationLog (
    log_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),
    pet_id INT REFERENCES Pets(pet_id),
    timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    message TEXT
);
