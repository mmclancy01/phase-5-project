"""empty message

Revision ID: d37be3a69947
Revises: f8a7d814eae6
Create Date: 2024-04-22 17:20:14.106943

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd37be3a69947'
down_revision = 'f8a7d814eae6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('courses',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('length', sa.Integer(), nullable=True),
    sa.Column('private', sa.Boolean(), nullable=False),
    sa.Column('par', sa.Integer(), nullable=True),
    sa.Column('slope', sa.Integer(), nullable=True),
    sa.Column('rating', sa.Float(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('img', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('courses')
    # ### end Alembic commands ###
