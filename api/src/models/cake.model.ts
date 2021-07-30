import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Cake } from '@interfaces/cake.interface';

export type CakeCreationAttributes = Optional<Cake, 'id' | 'comment' | 'imageUrl' | 'name' | 'yumFactor'>;

export class CakeModel extends Model<Cake, CakeCreationAttributes> implements Cake {
  public id: number;
  public name: string;
  public comment: string;
  public imageUrl: string;
  public yumFactor: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof CakeModel {
  CakeModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(30),
      },
      comment: {
        allowNull: false,
        type: DataTypes.STRING(200)
      },
      imageUrl: {
        allowNull: false,
        type: DataTypes.STRING
      },
      yumFactor: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 5
        }
      }
    },
    {
      tableName: 'cakes',
      sequelize,
    },
  );

  return CakeModel;
}
