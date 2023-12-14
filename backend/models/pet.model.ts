import { Sequelize, DataTypes } from 'sequelize';

export const petModelFunc = (sequelize: Sequelize) => {
  const Pet = sequelize.define('pet', {
    pet_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    species: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    breed: {
      type: DataTypes.STRING(50),
    },
    color: {
      type: DataTypes.STRING(30),
    },
    age: {
      type: DataTypes.INTEGER,
    },
    last_seen_location: {
      type: DataTypes.JSONB,
    },
    description: {
      type: DataTypes.TEXT,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'user_id',
      },
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        isIn: [['lost', 'found']],
      },
    },
  });
  return Pet;
};

export const petLocationHistory = (sequelize: Sequelize) => {
  const LocationHistory = sequelize.define('locationhistory', {
    location_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    pet_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'pets',
        key: 'pet_id',
      },
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  });
  return LocationHistory;
};

export const petReportModelFunc = (sequelize: Sequelize) => {
  const Report = sequelize.define('report', {
    report_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    reporter_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'user_id',
      },
      allowNull: false,
    },
    pet_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'pets',
        key: 'pet_id',
      },
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        isIn: [['open', 'closed']],
      },
    },
  });
  return Report;
};

export const imageGalleryModel = (sequelize: Sequelize) => {
  const ImageGallery = sequelize.define('ImageGallery', {
    image_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    pet_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'pets',
        key: 'pet_id',
      },
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  });
  return ImageGallery;
};

export const communicationLogModel = (sequelize: Sequelize) => {
  const CommunicationLog = sequelize.define('CommunicationLog', {
    log_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'user_id',
      },
      allowNull: false,
    },
    pet_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'pets',
        key: 'pet_id',
      },
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
    },
  });
  return CommunicationLog;
};
