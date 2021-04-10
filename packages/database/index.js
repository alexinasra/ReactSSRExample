const bcrypt = require('bcrypt');

bcrypt.compare('mypassword', '$2b$05$6czhFKLlmU18o9w6FQCnVeV/TmV3E8WfSmEKlZGh2gZFYCyYvQzv2').then(console.log)
bcrypt.compare('mypassword', '$2b$10$HeAIVzA7zT6gm68lvdOaPu0gVuhznanSJyyK8THQsAiUyfB0yXw5m').then(console.log)
